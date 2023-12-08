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
    const searchInput = document.querySelector("#search");
    const filteredResults = filterResults(results, searchInput ? searchInput.value : "");
    const articlesList = document.querySelector("#articles-list");
    if (articlesList) {
        articlesList.innerHTML = filteredResults.map((result) => {
            // ... reste du code
        }).join("");
    }
});
window.addEventListener("load", loadData);
