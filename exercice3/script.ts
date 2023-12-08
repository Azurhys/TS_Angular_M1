import { XMLHttpRequest } from "fetch";

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

const filterResults = (results, searchTerm) => {
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

  const results = users.map((user) => {
    return {
      title: user.name,
      author: user.username,
    };
  });

  results.push(...posts.map((post) => {
    return {
      title: post.title,
      author: post.author,
    };
  }));

  const filteredResults = filterResults(results, document.querySelector("#search").value);

  const articlesList = document.querySelector("#articles-list");
  articlesList.innerHTML = filteredResults.map((result) => {
    return `
      <li class="article">
        <h2>${result.title}</h2>
        <div class="metadata">
          <span class="author">${result.author}</span>
        </div>
      </li>
    `;
  }).join("");
};

window.addEventListener("load", loadData);
