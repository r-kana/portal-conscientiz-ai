function setSeachResults(questions)
{ 
  const indexes = Object.keys(questions)
  if(!indexes.length) return;
  $("#search-result").html(`
    <ul class="list-group list-group-flush">
      ${indexes.map(index => {
        const question = questions[index];
        return `
          <li class="list-group-item question-item">
            <a class="py-2" href="./faca-uma-pergunta.html?q_id=${question.id}">
              <div class="d-flex justify-content-between">
                <p class="m-0">${question.content}</p>
                <div class='question-result-icon'>
                  <span class='me-1'>
                    Ver resposta
                  </span>
                    <i class="bi bi-arrow-right"></i>
                </div>
              </div>
            </a>
          </li>
        `;
      }).join("\n")}
    </ul>
  `);
}

export {setSeachResults}