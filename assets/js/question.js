import { createToast } from "./toast.js"
import { setSeachResults } from "./search-question.js"

const questionForm = $("#question-form");
const questionSearchForm = $("#question-search-form")

$(function() {

  questionForm.on('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(questionForm[0]);
    await $.ajax({
      type: "POST",
      url: `http://localhost:3000/questions`,
      headers: {"Accept": "application/json"},
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
    .fail(( jqXHR, textStatus, errorThrown) => {
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
})