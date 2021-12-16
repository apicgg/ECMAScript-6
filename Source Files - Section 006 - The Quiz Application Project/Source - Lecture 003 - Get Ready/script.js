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

  if (questionLocalStorage.getQuestionCollection() === null) {
    questionLocalStorage.setQuestionCollection([]);
  }

  return {
    getQuestionLocalStorage: questionLocalStorage,

    addQuestionOnLocalStorage: function (newQuestText, opts) {
      var optionsArr, corrAns, questionId, newQuestion, getStoredQuests, isChecked;

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
        questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;
      } else {
        questionId = 0;
      }
      if (newQuestText.value !== '') {
        if (optionsArr.length > 1) {
          if (isChecked) {
            newQuestion = new Question(questionId, newQuestText.value, optionsArr, corrAns);

            getStoredQuests = questionLocalStorage.getQuestionCollection();
            getStoredQuests.push(newQuestion);
            questionLocalStorage.setQuestionCollection(getStoredQuests);

            newQuestText.value = '';
            for (let i = 0; i < opts.length; i++) {
              opts[i].value = '';
              opts[i].previousElementSibling.checked = false;
            }

            // console.log(getStoredQuests);
            return true;
          } else {
            alert('You need to select correct answer!');
            return false;
          }
        } else {
          alert('You need to add at least two options!');
          return false;
        }
      } else {
        alert('You need to add question!');
        return false;
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
    insertedQuestsWrapper: document.querySelector('.inserted-questions-wrapper'),
    questUpdateBtn: document.getElementById('question-update-btn'),
    questDeleteBtn: document.getElementById('question-delete-btn'),
    questsClearBtn: document.getElementById('questions-clear-btn'),
  };
  return {
    getDomItems: domItems,
    addInputsDynamically: function () {
      var addInput = function () {
        // var z = document.querySelectorAll('.admin-option').length;
        var z = domItems.adminOptions.length;
        var inputHTML = '<div class="admin-option-wrapper"><input type="radio" class="admin-option-' + z + '" name="answer" value="' + z + '" /><input type="text" class="admin-option admin-option-' + z + '" value="" /></div >';

        domItems.adminOptionsContainer.insertAdjacentHTML('beforeend', inputHTML);

        domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus', addInput);

        domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
      };

      domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);
    },

    createQuestionList: function (getQuestions) {
      var questHTML, numberingArr;

      numberingArr = [];

      domItems.insertedQuestsWrapper.innerHTML = '';

      for (let i = 0; i < getQuestions.getQuestionCollection().length; i++) {
        numberingArr.push(i + 1);

        questHTML = '<p><span>' + numberingArr[i] + '. ' + getQuestions.getQuestionCollection()[i].questionText + '</span><button id="question-' + getQuestions.getQuestionCollection()[i].id + '">Edit</button></p>';

        domItems.insertedQuestsWrapper.insertAdjacentHTML('afterbegin', questHTML);
      }
    },

    editQuestList: function (event, storageQuestList, addInpsDynFn) {
      var getId, getStorageQuestList, foundItem, placeInArr, optionHTML;

      if ('question-'.indexOf(event.target.id)) {
        getId = parseInt(event.target.id.split('-')[1]);
        getStorageQuestList = storageQuestList.getQuestionCollection();
        for (let i = 0; i < getStorageQuestList.length; i++) {
          if (getStorageQuestList[i].id === getId) {
            foundItem = getStorageQuestList[i];
            placeInArr = i;
          }
        }
        // console.log(foundItem, placeInArr);
        domItems.newQuestionText.value = foundItem.questionText;
        domItems.adminOptionsContainer.innerHTML = '';
        optionHTML = '';
        for (let i = 0; i < foundItem.options.length; i++) {
          optionHTML += '<div class="admin-option-wrapper"><input type="radio" class="admin-option-' + i + '" name="answer" value="' + i + '"><input type="text" class="admin-option admin-option-' + i + '" value="' + foundItem.options[i] + '"></div>';
        }
        // console.log(optionHTML);
        domItems.adminOptionsContainer.innerHTML = optionHTML;
        domItems.questUpdateBtn.style.visibility = 'visible';
        domItems.questDeleteBtn.style.visibility = 'visible';
        domItems.questInsertBtn.style.visibility = 'hidden';
        domItems.questsClearBtn.style.pointerEvents = 'none';
        addInpsDynFn();

        // console.log(foundItem);
        var updateQuestion = function () {
          var newOptions, optionEls;

          newOptions = [];
          optionEls = document.querySelectorAll('.admin-option');

          foundItem.questionText = domItems.newQuestionText.value;
          foundItem.correctAnswer = '';

          for (let i = 0; i < optionEls.length; i++) {
            if (optionEls[i] !== '') {
              // console.log(optionEls[i].value);
              newOptions.push(optionEls[i].value);
              if (optionEls[i].previousElementSibling.checked) {
                foundItem.correctAnswer = optionEls[i].value;
              }
            }
          }
          foundItem.options = newOptions;

          if (foundItem.questionText !== '') {
            if (foundItem.options.length > 1) {
              if (foundItem.correctAnswer !== '') {
                getStorageQuestList.splice(placeInArr, 1, foundItem);
                storageQuestList.setQuestionCollection(getStorageQuestList);
              } else {
                alert('You need to select correct answer!');
              }
            } else {
              alert('You need to insert at least two options!');
            }
          } else {
            alert('Please insert question!');
          }
        };
        domItems.questUpdateBtn.onclick = updateQuestion;
      }
    },
  };
})();

/**************************************/
/***********CONTROLLER ****************/
/**************************************/
var controller = (function (quizCtrl, UICtrl) {
  var selectedDomItems = UICtrl.getDomItems;

  UICtrl.addInputsDynamically();

  UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);

  selectedDomItems.questInsertBtn.addEventListener('click', function () {
    var adminOptions = document.querySelectorAll('.admin-option');

    var checkBoolean = quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, adminOptions);

    //This is dynamically add questions into the question list without browser refresh!!
    if (checkBoolean) {
      UICtrl.createQuestionList(quizCtrl.getQuestionLocalStorage);
    }
  });
  selectedDomItems.insertedQuestsWrapper.addEventListener('click', function (e) {
    UICtrl.editQuestList(e, quizCtrl.getQuestionLocalStorage, UICtrl.addInputsDynamically);
  });
})(quizController, UIController);
