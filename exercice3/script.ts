const usersUrl = "https://jsonplaceholder.typicode.com/users";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

interface Post {
  userId: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserWithArticles extends User {
  articles: Post[];
}

const getUsers = async (): Promise<User[]> => {
  const response = await fetch(usersUrl);
  const data = await response.json();
  return data;
};

const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(postsUrl);
  const data = await response.json();
  return data;
};

const filterResults = (
  results: UserWithArticles[],
  searchTerm: string,
  authorTerm: string
) => {
  if (!searchTerm && !authorTerm) {
    return results;
  }

  const regexTitle = new RegExp(searchTerm, "i");
  const regexAuthor = new RegExp(authorTerm, "i");

  return results.filter((result) => {
    const titleMatch =
      !searchTerm || result.articles.some((a) => regexTitle.test(a.title));

    const authorMatch =
      !authorTerm || regexAuthor.test(result.name);

    return (searchTerm ? titleMatch : true) && (authorTerm ? authorMatch : true);
  });
};




const loadData = async () => {
  const users = await getUsers();
  const posts = await getPosts();

  const userPostsMap: Record<number, Post[]> = {};

  posts.forEach((post) => {
    if (!userPostsMap[post.userId]) {
      userPostsMap[post.userId] = [];
    }

    userPostsMap[post.userId].push({
      title: post.title,
      body: post.body,
      userId: post.userId,
    });
  });

  const results: UserWithArticles[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    articles: userPostsMap[user.id] || [],
  }));

  const searchInput = document.querySelector("#search") as HTMLInputElement;
  const authorInput = document.querySelector("#author") as HTMLInputElement;
  const filteredResults = filterResults(results, searchInput ? searchInput.value : "", authorInput ? authorInput.value : "");

  const articlesList = document.querySelector("#articles-list");
  if (articlesList) {
    articlesList.innerHTML = filteredResults.map((result) => {
      const articlesHTML = `
      <li class="article">
        <h2>${result.name}</h2>
        <h4>${result.email}</h4>
        <div class="metadata">
          ${result.articles.map((article) => `<span class="author">${article.title}</span>`).join("")}
        </div>
      </li>
      `;
      return articlesHTML;
    }).join("");
  }
  console.log(results)
};

window.addEventListener("load", loadData);
loadData();

const searchForm = document.querySelector("form");
const searchButton = document.querySelector("button");

if (searchButton) {
  searchButton.addEventListener("click", () => {
    loadData();
  });
}

if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loadData();
  });
}