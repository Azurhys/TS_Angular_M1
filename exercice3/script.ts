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
        
    // Ajustez cette partie pour correspondre à la structure réelle de vos données
    const results = users.map((user: any) => {
      return {
        title: user.title, // Modifiez ici si nécessaire
        author: user.body,  // Modifiez ici si nécessaire
      };
    });
  
    results.push(...posts.map((post: any) => {
      return {
        title: post.title,
        author: post.body,
      };
    }));
  
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
  
  window.addEventListener("load", loadData);
  