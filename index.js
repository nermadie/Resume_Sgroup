//INITIAL
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
renderFlashcards();
//FORM
let addQuestionButton = document.querySelector(".add-question-btn");
let formContainer = document.querySelector(".form-container");

addQuestionButton.addEventListener("click", function (event) {
  event.preventDefault();
  formContainer.classList.remove("hideform");
});
//CLOSE FORM
let closeFormButton = document.querySelector(".close-form-btn");
closeFormButton.addEventListener("click", function (event) {
  event.preventDefault();
  formContainer.classList.add("hideform");
});
//GET DATA FROM FORM
let questionTextarea = document.querySelector(".question-textarea");
let answerTextarea = document.querySelector(".answer-textarea");
let saveBtn = document.querySelector(".save-btn");

saveBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let question = questionTextarea.value;
  let answer = answerTextarea.value;
  if (question !== "" && answer !== "") {
    let newFlashcard = {
      question: question,
      answer: answer,
      hide: "hideanswer",
    };
    flashcards.push(newFlashcard);
    questionTextarea.value = "";
    answerTextarea.value = "";
    renderFlashcards();
  }
});

//RENDER FLASHCARD
function renderFlashcards() {
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  let flashcardContainer = document.querySelector(".flashcard-container");
  flashcardContainer.innerHTML = "";
  for (let i = 0; i < flashcards.length; i++) {
    let flashcardHTML = `
    <div id="flashcard${i}" class="flashcard-wrapper">
      <h3>${flashcards[i].question}</h3>
      <a href="#" class="showhide">Show/Hide Answer</a>
      <h4 class="${flashcards[i].hide}">${flashcards[i].answer}</h4>
      <div class="button-container">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    </div>`;
    flashcardContainer.innerHTML += flashcardHTML;
  }
  for (let i = 0; i < flashcards.length; i++) {
    let flashcardWrapper = document.querySelector("#flashcard" + i);
    let flashcardAnswer = flashcardWrapper.querySelector("h4");
    let flashcardAnchor = flashcardWrapper.querySelector("a");
    let flashcardEditBtn = flashcardWrapper.querySelector(".edit-btn");
    let flashcardDeleteBtn = flashcardWrapper.querySelector(".delete-btn");

    //HIDE ANSWER
    flashcardAnchor.addEventListener("click", function (event) {
      event.preventDefault();
      flashcardAnswer.classList.toggle("hideanswer");
      if (flashcardAnswer.classList.contains("hideanswer"))
        flashcards[i].hide = "hideanswer";
      else
        flashcards[i].hide = "";
      renderFlashcards();
    });
    //DELETE FLASHCARD
    flashcardDeleteBtn.addEventListener("click", function (event) {
      event.preventDefault();
      flashcards.splice(i, 1);
      renderFlashcards();
    });
    //EDIT FLASHCARD
    flashcardEditBtn.addEventListener("click", function (event) {
      event.preventDefault();
      formContainer.classList.remove("hideform");
      questionTextarea.value = flashcards[i].question;
      answerTextarea.value = flashcards[i].answer;
      flashcards.splice(i, 1);
      renderFlashcards();
    });
  }
}
