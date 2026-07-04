import { appConfig } from "./app.js";

$(async function() {
  await loadPosts();
})

async function loadPosts()
{
  await $.ajax({
    type: "GET",
    url: `http://localhost:3000/posts`,
    headers: {"Accept": "application/json"},
  })
  .done((data, textStatus, jqXHR) => {
    setPosts(data)
  })
  .fail(( jqXHR, textStatus, errorThrown) => {
    console.log(textStatus)
  })
}

function setPosts(posts)
{
  const indexes = Object.keys(posts);
  $("#posts-list").html(`
    ${indexes.map(index => {
      const post = posts[index];

      return `
        <a href="./post.html?id=${post.id}" class="blog-post-anchor">
          <div class="card blog-post">
            ${post.imgSrc && `<img src="${appConfig.PUBLIC_URL + post.imgSrc}" class="card-img-top">`}
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="blog-post-title">${post.title}</h5>
                <p class="card-text">${post.subtitle}</p>
              </div>
              <div class="post-tags-container">
                ${post.tags.map(tag => {
                  return `<span class="blog-post-tag">${tag.name}</span>`
                }).join("")}
              </div>
            </div>
          </div>
        </a>
      `;
    }).join("")}
  `);
}