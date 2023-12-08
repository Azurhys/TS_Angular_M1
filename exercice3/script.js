"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const usersUrl = "https://jsonplaceholder.typicode.com/users";
const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(usersUrl);
    const data = yield response.json();
    return data;
});
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(postsUrl);
    const data = yield response.json();
    return data;
});
const filterResults = (results, searchTerm) => {
    if (!searchTerm) {
        return results;
    }
    const regex = new RegExp(searchTerm, "i");
    return results.filter((result) => {
        return regex.test(result.title) || regex.test(result.author);
    });
};
const loadData = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getUsers();
    const posts = yield getPosts();
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
});
window.addEventListener("load", loadData);
