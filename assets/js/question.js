import { createToast } from "./toast.js"

const questionForm = $("#question-form");

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
})