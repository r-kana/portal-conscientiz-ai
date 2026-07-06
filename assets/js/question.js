import { createToast } from "./toast.js"
import { setSeachResults } from "./search-question.js"

const questionForm = $("#question-form");
const questionSearchForm = $("#question-search-form")
const questionId = parseInt(new URLSearchParams(window.location.search).get('q_id'));

$(async function () {
  if (questionId) {
    await loadQuestion();
  }

  const hash = window.location.hash;
  if (hash === "#publish-question-section") {
    $('#question').trigger('focus');
  }
  else if (hash === "#question-search-section") {
    $("#searchQuestion").trigger('focus')
  }



  questionForm.on('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(questionForm[0]);
    await $.ajax({
      type: "POST",
      url: `https://conscientiz-ai-server.onrender.com/questions`,
      headers: { "Accept": "application/json" },
      contentType: 'application/json',
      data: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        content: formData.get("content")
      })
    })
      .done((data, textStatus, jqXHR) => {
        questionForm[0].reset();
        createToast("Pergunta publicada!");
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.log(textStatus)
      })
  })

  questionSearchForm.on("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(questionSearchForm[0]);
    const params = { search: formData.get("search") };
    const queryString = new URLSearchParams(params).toString();

    $.ajax({
      type: "GET",
      url: `https://conscientiz-ai-server.onrender.com/questions/search?${queryString}`,
      headers: { "Accept": "application/json" },
      contentType: 'application/json',
    })
      .done((data, textStatus, jqXHR) => {
        questionSearchForm[0].reset();
        setSeachResults(data);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        console.log(textStatus)
      })
  })
})

async function loadQuestion() {
  $.ajax({
    type: "GET",
    url: `https://conscientiz-ai-server.onrender.com/questions/${questionId}`,
    headers: { "Accept": "application/json" },
    contentType: 'application/json',
  })
    .done((data, textStatus, jqXHR) => {
      setQuestionResponse(data.question);
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.log(textStatus)
    })
}

function setQuestionResponse(question) {
  $("#search-result").html(`
    <div class='d-flex flex-column p-3'>
      <p>Pergunta:</p>
      <div class='px-2'>
        <h5  class='fw-semibold'>${question.content}</h5>
        <p class='m-0' style='font-size: 12px;'>Perguntada feita em: ${new Date(question.createdAt).toLocaleDateString()}</p>
      </div>
      <hr>
      <p>Resposta:</p>
      <div class='px-2'>
        <h5 style="text-align: justify;">${question.answer.content}</h5>
        <p class='m-0' style='font-size: 12px;'>Respondido em: ${new Date(question.answer.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  `);
}