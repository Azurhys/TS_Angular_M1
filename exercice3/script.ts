import { XMLHttpRequest } from "fetch";

const usersUrl = "https://jsonplaceholder.typicode.com/users";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";

const container = document.querySelector(".container");
const articlesList = document.querySelector("#articles-list");

const loadData = async () => {
  const usersResponse = await fetch(usersUrl);
  const users = await usersResponse.json();

  const postsResponse = await fetch(postsUrl);
  const posts = await postsResponse.json();

  const data = [...users, ...posts];

  articlesList.innerHTML = data.map((item) => {
    return `
      <li class="article">
        <h2>${item.title}</h2>
        <div class="metadata">
          <span class="author">${item.author}</span>
          <span class="date">${item.date}</span>
        </div>
      </li>
    `;
  }).join("");
};

loadData();

const filterData = () => {
  const searchTerm = document.querySelector("#search").value;
  const authorTerm = document.querySelector("#author").value;

  const filteredData = data.filter((item) => {
    return (
      searchTerm && item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      authorTerm && item.author.toLowerCase().includes(authorTerm.toLowerCase())
    );
  });

  articlesList.innerHTML = filteredData.map((item) => {
    return `
      <li class="article">
        <h2>${item.title}</h2>
        <div class="metadata">
          <span class="author">${item.author}</span>
          <span class="date">${item.date}</span>
        </div>
      </li>
    `;
  }).join("");
};

document.querySelector("#search").addEventListener("input", filterData);
document.querySelector("#author").addEventListener("input", filterData);
