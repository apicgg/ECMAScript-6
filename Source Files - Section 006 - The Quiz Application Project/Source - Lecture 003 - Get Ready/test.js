/**************************************/
/***********QUIZ CONTROLLER ***********/
/**************************************/

var quizController = (function () {
  // * Question Constructor //
  function Question(id, questionText, options, correctAnswer) {
    this.id = id;
    this.questionText = questionText;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }

  // * Question saved on browser local storage//
  var questionLocalStorage = {
    setQuestionCollection: function (newCollection) {
      localStorage.setItem('questionCollection', JSON.stringify(newCollection));
    },
    getQuestionCollection: function () {
      return JSON.parse(localStorage.getItem('questionCollection'));
    },
    removeQuestionCollection: function () {
      localStorage.removeItem('questionCollection');
    },
  };

  return {
    addQuestionOnLocalStorage: function (newQuestText, opts) {
      var optionsArr, corrAns, questionId, newQuestion, getStoredQuests, isChecked;

      // * Need to initialize local storage in browser with an empty array//
      if (questionLocalStorage.getQuestionCollection() === null) {
        questionLocalStorage.setQuestionCollection([]);
      }

      // * Add the options into the array from user input//
      optionsArr = [];
      isChecked = false;

      for (let i = 0; i < opts.length; i++) {
        if (opts[i].value != '') {
          optionsArr.push(opts[i].value);
        }
        // Data validation for correct answer
        if (opts[i].previousElementSibling.checked && opts[i].value != '') {
          corrAns = opts[i].value;
          isChecked = true;
        }
      }

      // * For setting up questionId dynamically //
      if (questionLocalStorage.getQuestionCollection().length > 0) {
        questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
      } else {
        questionId = 0;
      }

      // * For handling the empty question text field and options for correct answers//
      if (newQuestText.value != '') {
        if (optionsArr.length > 1) {
          if (isChecked) {
            // * New array of adding questions as object//
            newQuestion = new Question(questionId, newQuestText.value, optionsArr, corrAns);

            getStoredQuests = questionLocalStorage.getQuestionCollection();
            getStoredQuests.push(newQuestion);
            questionLocalStorage.setQuestionCollection(getStoredQuests);

            // Clear the question field after insert//
            newQuestText.value = '';
            for (let i = 0; i < opts.length; i++) {
              opts[i].value = '';
              opts[i].previousElementSibling.checked = false;
            }
            console.log(questionLocalStorage.getQuestionCollection());
          } else {
            alert('Please select correct answer!');
          }
        } else {
          alert('Please insert at least two options!');
        }
      } else {
        alert('Please insert question!');
      }
    },
  };
})();

/**************************************/
/***********UI CONTROLLER *************/
/**************************************/

var UIController = (function () {
  var domItems = {
    // ! Admin Panel Elements
    questInsertBtn: document.getElementById('question-insert-btn'),
    newQuestionText: document.getElementById('new-question-text'),
    adminOptions: document.querySelectorAll('.admin-option'),
    adminOptionsContainer: document.querySelector('.admin-options-container'),
  };
  return {
    getDomItems: domItems,
    addInputsDynamically: function () {
      var addInput = function () {
        var inputHTML, z;
        z = document.querySelectorAll('.admin-option').length;
        inputHTML = '<div class="admin-option-wrapper"><input type="radio"class="admin-option-' + z + '"name="answer"value="' + z + '"/><input type="text" class="admin-option admin-option-' + z + '" value="" /></div>';
        domItems.adminOptionsContainer.insertAdjacentHTML('beforeend', inputHTML);
        domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus', addInput);
        domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
      };
      domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
    },
  };
})();

/**************************************/
/***********CONTROLLER ****************/
/**************************************/

var controller = (function (quizCtrl, UICtrl) {
  var selectedDomItems = UICtrl.getDomItems;
  UICtrl.addInputsDynamically();
  selectedDomItems.questInsertBtn.addEventListener('click', function () {
    var adminOptions = document.querySelectorAll('.admin-option');
    quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, adminOptions);
  });
})(quizController, UIController);
