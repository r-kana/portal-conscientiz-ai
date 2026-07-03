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
            <div class="py-2">
              <p class="m-0">${question.content}</p>
            </div>
          </li>
        `;
      }).join("\n")}
    </ul>
  `);
}

export {setSeachResults}