const usersUrl = "https://jsonplaceholder.typicode.com/users";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

const getUsers = async () => {
  const response = await fetch(usersUrl);
  const data = await response.json();
  return data;
};

const getPosts = async () => {
  const response = await fetch(postsUrl);
  const data = await response.json();
  return data;
};

const filterResults = (results: any[], searchTerm: string) => {
  if (!searchTerm) {
    return results;
  }

  const regex = new RegExp(searchTerm, "i");
  return results.filter((result) => {
    return regex.test(result.title) || regex.test(result.author);
  });
};

const loadData = async () => {
  const users = await getUsers();
  const posts = await getPosts();
  console.log(users);
  console.log(posts);

  
  const results = [
    ...users.map((user: any) => {
      return {
        title: user.name, // Modifiez ici si nécessaire
        author: user.username, 
      };
    }),
    ...posts.map((post: any) => {
      return {
        title: post.title,
        author: post.body,
      };
    }),
  ];
 
  const searchInput = document.querySelector("#search") as HTMLInputElement;
  const filteredResults = filterResults(results, searchInput ? searchInput.value : "");

  const articlesList = document.querySelector("#articles-list");
  if (articlesList) {
    articlesList.innerHTML = filteredResults.map((result: any) => {
      return `
        <li class="article">
          <h2>${result.title}</h2>
          <div class="metadata">
            <span class="author">${result.author}</span>
          </div>
        </li>
      `;
    }).join("");
  }
};
console.log('bite')

window.addEventListener("load", loadData);
