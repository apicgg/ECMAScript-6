/**************************************/
/***********QUIZ CONTROLLER ***********/
/**************************************/

var quizController = (function () {
  // Question Constructor
  function Question(id, questionText, options, correctAnswer) {
    this.id = id;
    this.questionText = questionText;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }
  return {
    addQuestionOnLocalStorage: function (newQuestText, opts) {
      var optionsArr, corrAns, questionId, newQuestion;
      optionsArr = [];
      questionId = 0;
      for (let i = 0; i < opts.length; i++) {
        if (opts[i].value !== '') {
          optionsArr.push(opts[i].value);
        }
        if (opts[i].previousElementSibling.checked && opts[i].value !== '') {
          corrAns = opts[i].value;
        }
      }
      newQuestion = new Question(
        questionId,
        newQuestText.value,
        optionsArr,
        corrAns
      );
      console.log(newQuestion);
    },
  };
})();

/**************************************/
/***********UI CONTROLLER *************/
/**************************************/
var UIController = (function () {
  var domItems = {
    // Admin Panel Elements
    questInsertBtn: document.getElementById('question-insert-btn'),
    newQuestionText: document.getElementById('new-question-text'),
    adminOptions: document.querySelectorAll('.admin-option'),
  };
  return {
    getDomItems: domItems,
  };
})();

/**************************************/
/***********CONTROLLER ****************/
/**************************************/
var controller = (function (quizCtrl, UICtrl) {
  var selectedDomItems = UICtrl.getDomItems;
  selectedDomItems.questInsertBtn.addEventListener('click', function () {
    quizCtrl.addQuestionOnLocalStorage(
      selectedDomItems.newQuestionText,
      selectedDomItems.adminOptions
    );
  });
})(quizController, UIController);
