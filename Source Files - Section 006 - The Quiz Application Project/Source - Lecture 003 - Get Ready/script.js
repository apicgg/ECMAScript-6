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
      var optionsArr,
        corrAns,
        questionId,
        newQuestion,
        getStoredQuests,
        isChecked;

      if (questionLocalStorage.getQuestionCollection() === null) {
        questionLocalStorage.setQuestionCollection([]);
      }

      optionsArr = [];
      isChecked = false;

      for (let i = 0; i < opts.length; i++) {
        if (opts[i].value !== '') {
          optionsArr.push(opts[i].value);
        }
        if (opts[i].previousElementSibling.checked && opts[i].value !== '') {
          corrAns = opts[i].value;
          isChecked = true;
        }
      }
      // [{id:0}, {id:1}]
      if (questionLocalStorage.getQuestionCollection().length > 0) {
        questionId =
          questionLocalStorage.getQuestionCollection()[
            questionLocalStorage.getQuestionCollection().length - 1
          ].id + 1;
      } else {
        questionId = 0;
      }
      if (newQuestText.value !== '') {
        if (optionsArr.length > 1) {
          if (isChecked) {
            newQuestion = new Question(
              questionId,
              newQuestText.value,
              optionsArr,
              corrAns
            );

            getStoredQuests = questionLocalStorage.getQuestionCollection();
            getStoredQuests.push(newQuestion);
            questionLocalStorage.setQuestionCollection(getStoredQuests);

            newQuestText.value = '';
            for (let i = 0; i < opts.length; i++) {
              opts[i].value = '';
              opts[i].previousElementSibling.checked = false;
            }

            console.log(getStoredQuests);
          } else {
            alert('You need to select correct answer!');
          }
        } else {
          alert('You need to add at least two options!');
        }
      } else {
        alert('You need to add question!');
      }
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
    adminOptionsContainer: document.querySelector('.admin-options-container'),
  };
  return {
    getDomItems: domItems,
    addInputsDynamically: function () {
      var addInput = function () {
        var z = document.querySelectorAll('.admin-option').length;
        var inputHTML =
          '<div class="admin-option-wrapper"><input type="radio" class="admin-option-' +
          z +
          '" name="answer" value="' +
          z +
          '" /><input type="text" class="admin-option admin-option-' +
          z +
          '" value="" />< /div >';

        domItems.adminOptionsContainer.insertAdjacentHTML(
          'beforeend',
          inputHTML
        );
      };

      domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener(
        'focus',
        addInput
      );
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
    quizCtrl.addQuestionOnLocalStorage(
      selectedDomItems.newQuestionText,
      selectedDomItems.adminOptions
    );
  });
})(quizController, UIController);
