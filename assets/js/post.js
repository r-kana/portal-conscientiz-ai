import { createToast } from "./toast.js"
import { appConfig } from "./app.js";

const starRating = $('.star-rating');
const ratingValue = $('#rating-value');
const ratingState = {dirty: false, value: 0, last: 0}
const postId = parseInt(new URLSearchParams(window.location.search).get('id'));
const commentForm = $("#comment-form");

$(async function() {

  await loadPostContent();

  setRating();

  ratingValue.text($('.star-rating input:checked').val());

  starRating.on('change', (e) => { 
    ratingValue.text(e.target.value);
    ratingState.dirty = true;
    ratingState.value = e.target.value
    setupUpdateRating()
  });

  document.querySelectorAll('.star-rating:not(.readonly) label')
  .forEach(star => {
    star.addEventListener('click', function() {
      this.style.transform = 'scale(1.2)';
      setTimeout(() => this.style.transform = 'scale(1)', 200);
    });
  });

  commentForm.on('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(commentForm[0]);
    await $.ajax({
      type: "POST",
      url: `http://localhost:3000/comments/${postId}`,
      headers: {"Accept": "application/json"},
      contentType: 'application/json',
      data: JSON.stringify({
        postId: postId, 
        name: formData.get("name"),
        email: formData.get("email"),
        content: formData.get("content")
      })
    })
    .done((data, textStatus, jqXHR) => {
      commentForm[0].reset();
      createToast("Comentário enviado!");  
    })
    .fail(( jqXHR, textStatus, errorThrown) => {
      console.log(textStatus)
    })
  })
})

async function loadPostContent()
{
  await $.ajax({
    type: "GET",
    url: `http://localhost:3000/posts/${postId}`,
    headers: {"Accept": "application/json"},
  })
  .done((data, textStatus, jqXHR) => {
    setPostContent(data.post)
  })
  .fail(( jqXHR, textStatus, errorThrown) => {
    console.log(textStatus)
  })
}

function setPostContent(post)
{
  $("#post-title").html(post.title);
  $("#post-subtitle").html(post.subtitle) ;
  $("#post-time-stamp").html(`Publicado em ${new Date(post.updatedAt).toLocaleDateString()}`);
  $("#post-main").html(`
    ${post.imgSrc && `<img src="${appConfig.PUBLIC_URL + post.imgSrc}" class="post-image"></img>`}
    ${post.content}
  `);
  
  $("#post-tags").html(`
    <p>
      Tags: 
      ${post.tags.map(tag => `<span class="post-tag">${tag.name}</span>`).join("\n")}
    </p>
  `);
}

function setupUpdateRating()
{
  const TWENTY_SECONDS = 60 * 20;
  setTimeout(() => {
    if(ratingState.dirty)  {
      const value = $('input[name="rating"]:checked').val();

      $.ajax({
        type: "POST",
        url: `http://localhost:3000/posts/${postId}/rating`,
        headers: {"Accept": "application/json"},
        contentType: 'application/json',
        data: JSON.stringify({ rating: parseInt(value) })
      })
      .done((data, textStatus, jqXHR) => {
        ratingState.value = value;
        ratingState.last = value;
        ratingState.dirty = false;
        localStorage.setItem(`post[${postId}]:rating`, JSON.stringify({postId: postId, rating: value}))

        createToast("Avaliação salva!");
      })
      .fail(( jqXHR, textStatus, errorThrown) => {
        console.log(textStatus)
      })
    }
  }, TWENTY_SECONDS);
}

function setRating()
{
  const postInfoJson = localStorage.getItem(`post[${postId}]:rating`);
  if(postInfoJson)
  {
    const postInfo = JSON.parse(postInfoJson)
    $(`#start${postInfo.rating}`).prop("checked", true);
    starRating.trigger("change");
  }
  else {
    $('.star-rating input:checked').prop("checked", false);
    starRating.trigger("change");
  }
}