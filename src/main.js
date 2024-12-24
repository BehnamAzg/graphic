import { POSTS } from "./data.js";

const imageDialog = document.getElementById("imageDialog");
const innerDialog = document.querySelectorAll(".innerDialog");
const allPosts = document.getElementById("allPosts");
let dialogImageDiv = document.getElementById("dialogImageDiv");

// open image dialog
document.addEventListener("DOMContentLoaded", () => {
  const postsEl = document.querySelectorAll(".posts");
  postsEl.forEach((i) => {
    i.addEventListener("click", () => {
      imageDialog.showModal();
      const id = i.getAttribute("data-id")
      const targetPost = POSTS.find(post => post.id === id);
      dialogImageDiv.innerHTML = `
        <img class="h-full w-full" src="${targetPost.image}" loading="lazy" />
      `
    });
  });
  
  // removes the loading spinner when image is loaded
  document.querySelectorAll(".image").forEach((img) => {
    img.onload = () => {
      const container = img.parentElement;
      container.querySelector(".loading-spinner").style.display = "none";
    };
  });
})

// close dialogs on click
imageDialog.addEventListener("click", () => {
  imageDialog.close();
});

// prevent dialogs to close when cliked inside
innerDialog.forEach((i) => {
  i.addEventListener("click", (event) => event.stopPropagation());
});

// shows the posts in html
POSTS.forEach(function(post) {
  let postHTML = `
    <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col justify-end posts" data-id="${post.id}">
      <button class="rounded-md overflow-hidden hover:scale-105 hover:-translate-y-3 transition-all hover:shadow-md relative bg-white aspect-square">
        <img class="h-full w-full image" src="${post.cover}" loading="lazy" />
        <div class="w-full h-full absolute inset-0 flex justify-center items-center loading-spinner">
          <img class=" w-12 h-12" src="./images/preload.svg" />
        </div>
      </button>
        <div class="pt-3 flex items-center justify-between px-1">
          <p class="text-sm text-gray-400">${post.categorie}</p>
          <p class="text-xs tracking-widest text-gray-400" dir="ltr">${post.date}</p>
        </div>
        <p class="pt-3 text-gray-900 px-1">${post.title}</p>  
    </div>
  `
  allPosts.innerHTML += postHTML;
})

// show copyright
document.getElementById("copyright").innerHTML = `&copy; ${new Date().getFullYear()} Behnam Azg, All rights reserved.`