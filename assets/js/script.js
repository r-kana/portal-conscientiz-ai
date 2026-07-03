import { setSeachResults } from "./search-question.js"

const questionSearchForm = $("#question-search-form")

$(async function() {
  await loadQuestions();
  await loadPosts();

  questionSearchForm.on("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(questionSearchForm[0]);
    const params = { search: formData.get("search") };
    const queryString = new URLSearchParams(params).toString();

    $.ajax({
      type: "GET",
      url: `http://localhost:3000/questions/search?${queryString}`,
      headers: {"Accept": "application/json"},
      contentType: 'application/json',
    })
    .done((data, textStatus, jqXHR) => {
      questionSearchForm[0].reset();
      setSeachResults(data);
    })
    .fail(( jqXHR, textStatus, errorThrown) => {
      console.log(textStatus)
    })
  })

  // carouselInit()
  // $("#carousel-btn-prev").on('click', () => { slideLeft() })
  // $("#carousel-btn-next").on('click', () => { slideRight() })
});

var windowItemsOffset;

function carouselInit() {
  let carouselItemLength = $('#carousel-inner').children().length;
  let itemWidth = $('#carousel-inner').children()[0].offsetWidth;
  let carouselWidth = $('#carousel-inner').prop("scrollWidth");
  let windowWidth = $('#carousel-inner').prop("offsetWidth");
  let gapWidth = (carouselWidth - (itemWidth * carouselItemLength)) / (carouselItemLength-1);
  let itemsOnWindow = Math.floor(windowWidth/(itemWidth + gapWidth));

  windowItemsOffset = (itemWidth + gapWidth) * itemsOnWindow;
}

var windowMoveOffset = 0;

function slideRight() {
  $('#carousel-inner')[0].scrollLeft += (windowItemsOffset);
}

function slideLeft() {
  $('#carousel-inner')[0].scrollLeft -= (windowItemsOffset);
}
async function loadQuestions()
{
  await $.ajax({
    type: "GET",
    url: "http://localhost:3000/questions?limit=4",
    headers: {"Accept": "application/json"},
  })
  .done((data, textStatus, jqXHR) => {
    setSugestedQuestions(data)
  })
  .fail(( jqXHR, textStatus, errorThrown) => {
    console.log(textStatus)
  })
}

function setSugestedQuestions(questions)
{
  const indexes = Object.keys(questions);
  if(indexes.length === 4) {
    $("#sugested-questions").html(`
      <div class="col">
        <div class="px-3 py-2 rounded mb-2 sugested-question">
          <p class="m-0">${questions[0].content}</p>
        </div>
        <div class="px-3 py-2 rounded mb-2 sugested-question">
          <p class="m-0">${questions[1].content}</p>
        </div>
      </div>
      <div class="col">
        <div class="px-3 py-2 rounded mb-2 sugested-question">
          <p class="m-0">${questions[2].content}</p>
        </div>
        <div class="px-3 py-2 rounded mb-2 sugested-question">
          <p class="m-0">${questions[3].content}</p>
        </div>
      </div>
    `);
  }
}

async function loadPosts()
{
  await $.ajax({
    type: "GET",
    url: "http://localhost:3000/posts?limit=4",
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
  const indexes = Object.keys(posts)
  if(!indexes.length) return;
  const postList = $("#post-list");
  for(const index of indexes)
  {
    const post = posts[index];
    const html = `
      <a href="/post.html?id=${post.id}" class="text-decoration-none">
        <div class="card" style="max-width: 1000px">
          <div class="card-body">
            <h5 class="card-title fw-bold">${post.title}</h5>
            <p class="card-text">${post.subtitle}</p>
            <p class='m-0' style='font-size: 12px; letter-spacing: 1px'>Publicado em: ${new Date(post.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </a>
      `;
    
    postList.append(html)
  }
}

