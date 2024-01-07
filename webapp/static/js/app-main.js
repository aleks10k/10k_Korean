
let condition = {
  'difficulty': localStorage['difficulty'] ? localStorage['difficulty'] : 'medium',
  'basicVowels': localStorage['basicVowels'] ? localStorage['basicVowels'] : 'True',
  'compoundVowels': localStorage['compoundVowels'] ? localStorage['compoundVowels'] : 'True',
  'basicConsonants': localStorage['basicConsonants'] ? localStorage['basicConsonants'] : 'True',
  'compoundConsonants': localStorage['compoundConsonants'] ? localStorage['compoundConsonants'] : 'True',
  'bcbvSyllables': localStorage['bcbvSyllables'] ? localStorage['bcbvSyllables'] : 'True',
  'bccvSyllables': localStorage['bccvSyllables'] ? localStorage['bccvSyllables'] : 'True',
  'ccbvSyllables': localStorage['ccbvSyllables'] ? localStorage['ccbvSyllables'] : 'True',
  'cccvSyllables': localStorage['cccvSyllables'] ? localStorage['cccvSyllables'] : 'True',
  'generalAnswerCounter': localStorage['generalAnswerCounter'] ? Number(localStorage['generalAnswerCounter']) : 0,
  'correctAnswerCounter': localStorage['correctAnswerCounter'] ? Number(localStorage['correctAnswerCounter']) : 0,
};

let requestParameters = {
  'URL': 'http://127.0.0.1:5000/get_questions',
  'easy': [
    'difficulty=easy',
    condition.basicVowels == 'True' ? `&basic-vowels=${condition.basicVowels}` : '',
    condition.compoundVowels == 'True' ? `&compound-vowels=${condition.compoundVowels}` : '',
    condition.basicConsonants == 'True' ? `&basic-consonants=${condition.basicConsonants}` : '',
    condition.compoundConsonants == 'True' ? `&compound-consonants=${condition.compoundConsonants}` : '',
  ],
  'medium': [
    'difficulty=medium',
    condition.bcbvSyllables == 'True' ? `&bcbv-syllables=${condition.bcbvSyllables}` : '',
    condition.bccvSyllables == 'True' ? `&bccv-syllables=${condition.bccvSyllables}` : '',
    condition.ccbvSyllables == 'True' ? `&ccbv-syllables=${condition.ccbvSyllables}` : '',
    condition.cccvSyllables == 'True' ? `&cccv-syllables=${condition.cccvSyllables}` : '',
  ],
  'hard': [
    'difficulty=hard',
  ],
};

let optionButtonsList = document.getElementsByClassName('option-buttons');
setScoreCounters();
const questionRequest = new XMLHttpRequest();
let questionArray = [];

function getQuestions() {
  questionRequest.open('POST', requestParameters.URL, true);
  questionRequest.responseType = 'json';
  questionRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  questionRequest.onreadystatechange = () => {
    if (questionRequest.readyState === XMLHttpRequest.DONE && questionRequest.status === 200) {
      questionArray = questionRequest.response;
      showQuestion();
    };
  };
  questionRequest.send(requestParameters[condition.difficulty].join(''));
};

function addQuestions() {
  questionRequest.open('POST', requestParameters.URL, true);
  questionRequest.responseType = 'json';
  questionRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  questionRequest.onreadystatechange = () => {
    if (questionRequest.readyState === XMLHttpRequest.DONE && questionRequest.status === 200) {
      for (question in questionRequest.response) {
        questionArray.push(questionRequest.response[question]);
      };
    };
  };
  questionRequest.send(requestParameters[condition.difficulty].join(''));
};

function showQuestion() {
  document.querySelector('#Question').innerText = questionArray[0]['question'];
  document.querySelector('#Option-button-0').innerText = questionArray[0]['answer_options'][0];
  document.querySelector('#Option-button-1').innerText = questionArray[0]['answer_options'][1];
  document.querySelector('#Option-button-2').innerText = questionArray[0]['answer_options'][2];
  document.querySelector('#Option-button-3').innerText = questionArray[0]['answer_options'][3];
};

function countUpAllAnswers() {
  condition.generalAnswerCounter += 1;
  localStorage['generalAnswerCounter'] = condition.generalAnswerCounter;
};

function countUpCorrectAnswer() {
  condition.correctAnswerCounter += 1;
  localStorage['correctAnswerCounter'] = condition.correctAnswerCounter;
};

function setScoreCounters() {
  let percents = Math.round(condition.correctAnswerCounter / condition.generalAnswerCounter * 100);
  if (percents > 79) {
    document.querySelector('#Stat-filler').style.backgroundColor = '';
  };
  if (percents < 80 && percents > 59) {
    document.querySelector('#Stat-filler').style.backgroundColor = 'rgb(255, 137, 6)';
  };
  if (percents < 60) {
    document.querySelector('#Stat-filler').style.backgroundColor = 'rgb(225,97,98)';
  };
  if (condition.correctAnswerCounter == 0 && condition.generalAnswerCounter == 0) {
    document.querySelector('#Stat-text').innerText = 'Correct answers: 0';
    document.querySelector('#Stat-filler').style.width = '0';
  } else {
    document.querySelector('#Stat-text').innerText =
      `Correct answers: ${condition.correctAnswerCounter} of ${condition.generalAnswerCounter} (${percents}%).`;
      document.querySelector('#Stat-filler').style.width = `${percents}%`;
  };
};

function resetScoreCounters() {
  condition.generalAnswerCounter = 0;
  localStorage['generalAnswerCounter'] = 0;
  condition.correctAnswerCounter = 0;
  localStorage['correctAnswerCounter'] = 0;
  setScoreCounters();
};

function makeButtonsInactive() {
  document.querySelector('#Option-button-0')['disabled'] = true;
  document.querySelector('#Option-button-1')['disabled'] = true;
  document.querySelector('#Option-button-2')['disabled'] = true;
  document.querySelector('#Option-button-3')['disabled'] = true;
};

function makeButtonsActive() {
  document.querySelector('#Option-button-0')['disabled'] = false;
  document.querySelector('#Option-button-1')['disabled'] = false;
  document.querySelector('#Option-button-2')['disabled'] = false;
  document.querySelector('#Option-button-3')['disabled'] = false;
};

function checkAnswer() {
  if (event.target.innerText == questionArray[0].answer) {
    changeOptionButtonColor('rgb(44, 182, 125)');
    playSound(correctAnswer);
    countUpAllAnswers();
    countUpCorrectAnswer();
  } else {
    changeOptionButtonColor('rgb(244, 93, 72)');
    playSound(incorrectAnswer);
    countUpAllAnswers();
  };
};

function deleteAnsweredQuestion() {
  questionArray.shift();
};

for (button in optionButtonsList) {
  if (typeof(optionButtonsList[button]) == 'object') {
    optionButtonsList[button].addEventListener('click', (event) => {
      makeButtonsInactive();
      checkAnswer();
      setScoreCounters()
      setTimeout(function() {
        changeAllOptionButtonsColor('rgb(248, 245, 242)');
        makeButtonsActive();
        deleteAnsweredQuestion();
        showQuestion();
        if (questionArray['length'] == 1) {
            addQuestions();
        };
      }, 700);
    });
  };
};

document.querySelector('#Easy-button').addEventListener('click', () => {sidenav.setButtonActive('easyButton');});
document.querySelector('#Medium-button').addEventListener('click', () => {sidenav.setButtonActive('mediumButton');});
document.querySelector('#Hard-button').addEventListener('click', () => {sidenav.setButtonActive('hardButton');});
document.querySelector('#BV-Ch-button').addEventListener('click', () => {sidenav.setButtonActive('BVChButton');});
document.querySelector('#BV-Unch-button').addEventListener('click', () => {sidenav.setButtonActive('BVUnchButton');});
document.querySelector('#CV-Ch-button').addEventListener('click', () => {sidenav.setButtonActive('CVChButton');});
document.querySelector('#CV-Unch-button').addEventListener('click', () => {sidenav.setButtonActive('CVUnchButton');});
document.querySelector('#BC-Ch-button').addEventListener('click', () => {sidenav.setButtonActive('BCChButton');});
document.querySelector('#BC-Unch-button').addEventListener('click', () => {sidenav.setButtonActive('BCUnchButton');});
document.querySelector('#CC-Ch-button').addEventListener('click', () => {sidenav.setButtonActive('CCChButton');});
document.querySelector('#CC-Unch-button').addEventListener('click', () => {sidenav.setButtonActive('CCUnchButton');});
document.querySelector('#BCBV-Ch-button').addEventListener('click', () => {sidenav.setButtonActive('BCBVChButton');});
document.querySelector('#BCBV-Unch-button').addEventListener('click', () => {sidenav.setButtonActive('BCBVUnchButton');});
document.querySelector('#BCCV-Ch-button').addEventListener('click', () => {sidenav.setButtonActive('BCCVChButton');});
document.querySelector('#BCCV-Unch-button').addEventListener('click', () => {sidenav.setButtonActive('BCCVUnchButton');});
document.querySelector('#CCBV-Ch-button').addEventListener('click', () => {sidenav.setButtonActive('CCBVChButton');});
document.querySelector('#CCBV-Unch-button').addEventListener('click', () => {sidenav.setButtonActive('CCBVUnchButton');});
document.querySelector('#CCCV-Ch-button').addEventListener('click', () => {sidenav.setButtonActive('CCCVChButton');});
document.querySelector('#CCCV-Unch-button').addEventListener('click', () => {sidenav.setButtonActive('CCCVUnchButton');});
document.querySelector('#Apply-button').addEventListener('click', () => {sidenav.apply();});
document.querySelector('#Counter-reset').addEventListener('click', () => {resetScoreCounters();});

sidenav = {
  'easyButton': {
    'id': '#Easy-button',
    'isActive': localStorage['difficulty'] == 'easy' || condition.difficulty == 'easy' ? 'active' : 'inactive',
    'makesInactive': ['mediumButton', 'hardButton'],
    'hidesElements': ['#Medium-settings', '#Hard-settings'],
    'unhidesElements': ['#Easy-settings'],
    'backgroundColor': 'rgb(0, 204, 102)',
    'boxShadow': '6px 6px 48px rgba(0, 204, 102, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
    'mediumButton': {
    'id': '#Medium-button',
    'isActive': localStorage['difficulty'] == 'medium' || condition.difficulty == 'medium' ? 'active' : 'inactive',
    'makesInactive': ['easyButton', 'hardButton'],
    'hidesElements': ['#Easy-settings', '#Hard-settings'],
    'unhidesElements': ['#Medium-settings'],
    'backgroundColor': 'rgb(255, 140, 26)',
    'boxShadow': '6px 6px 48px rgba(255, 140, 26, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
    'hardButton': {
    'id': '#Hard-button',
    'isActive': localStorage['difficulty'] == 'hard' || condition.difficulty == 'hard' ? 'active' : 'inactive',
    'makesInactive': ['easyButton', 'mediumButton'],
    'hidesElements': ['#Easy-settings', '#Medium-settings'],
    'unhidesElements': ['#Hard-settings'],
    'backgroundColor': 'rgb(244, 93, 72)',
    'boxShadow': '6px 6px 48px rgba(244, 93, 72, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'BVChButton': {
    'id': '#BV-Ch-button',
    'makesInactive': ['BVUnchButton'],
    'isActive': localStorage['basicVowels'] == 'True' || condition.basicVowels == 'True' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(0, 204, 102)',
    'boxShadow': '6px 6px 48px rgba(0, 204, 102, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'BVUnchButton': {
    'id': '#BV-Unch-button',
    'makesInactive': ['BVChButton'],
    'isActive': localStorage['basicVowels'] == 'False' || condition.basicVowels == 'False' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(244, 93, 72)',
    'boxShadow': '6px 6px 48px rgba(244, 93, 72, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'CVChButton': {
    'id': '#CV-Ch-button',
    'makesInactive': ['CVUnchButton'],
    'isActive': localStorage['compoundVowels'] == 'True' || condition.compoundVowels == 'True' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(0, 204, 102)',
    'boxShadow': '6px 6px 48px rgba(0, 204, 102, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'CVUnchButton': {
    'id': '#CV-Unch-button',
    'makesInactive': ['CVChButton'],
    'isActive': localStorage['compoundVowels'] == 'False' || condition.compoundVowels == 'False' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(244, 93, 72)',
    'boxShadow': '6px 6px 48px rgba(244, 93, 72, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'BCChButton': {
    'id': '#BC-Ch-button',
    'makesInactive': ['BCUnchButton'],
    'isActive': localStorage['basicConsonants'] == 'True' || condition.basicConsonants == 'True' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(0, 204, 102)',
    'boxShadow': '6px 6px 48px rgba(0, 204, 102, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'BCUnchButton': {
    'id': '#BC-Unch-button',
    'makesInactive': ['BCChButton'],
    'isActive': localStorage['basicConsonants'] == 'False' || condition.basicConsonants == 'False' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(244, 93, 72)',
    'boxShadow': '6px 6px 48px rgba(244, 93, 72, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'CCChButton': {
    'id': '#CC-Ch-button',
    'makesInactive': ['CCUnchButton'],
    'isActive': localStorage['compoundConsonants'] == 'True' || condition.compoundConsonants == 'True' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(0, 204, 102)',
    'boxShadow': '6px 6px 48px rgba(0, 204, 102, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'CCUnchButton': {
    'id': '#CC-Unch-button',
    'makesInactive': ['CCChButton'],
    'isActive': localStorage['compoundConsonants'] == 'False' || condition.compoundConsonants == 'False' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(244, 93, 72)',
    'boxShadow': '6px 6px 48px rgba(244, 93, 72, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'BCBVChButton': {
    'id': '#BCBV-Ch-button',
    'makesInactive': ['BCBVUnchButton'],
    'isActive': localStorage['bcbvSyllables'] == 'True' || condition.bcbvSyllables == 'True' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(0, 204, 102)',
    'boxShadow': '6px 6px 48px rgba(0, 204, 102, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'BCBVUnchButton': {
    'id': '#BCBV-Unch-button',
    'makesInactive': ['BCBVChButton'],
    'isActive': localStorage['bcbvSyllables'] == 'False' || condition.bcbvSyllables == 'False' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(244, 93, 72)',
    'boxShadow': '6px 6px 48px rgba(244, 93, 72, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'BCCVChButton': {
    'id': '#BCCV-Ch-button',
    'makesInactive': ['BCCVUnchButton'],
    'isActive': localStorage['bccvSyllables'] == 'True' || condition.bccvSyllables == 'True' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(0, 204, 102)',
    'boxShadow': '6px 6px 48px rgba(0, 204, 102, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'BCCVUnchButton': {
    'id': '#BCCV-Unch-button',
    'makesInactive': ['BCCVChButton'],
    'isActive': localStorage['bccvSyllables'] == 'False' || condition.bccvSyllables == 'False' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(244, 93, 72)',
    'boxShadow': '6px 6px 48px rgba(244, 93, 72, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'CCBVChButton': {
    'id': '#CCBV-Ch-button',
    'makesInactive': ['CCBVUnchButton'],
    'isActive': localStorage['ccbvSyllables'] == 'True' || condition.ccbvSyllables == 'True' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(0, 204, 102)',
    'boxShadow': '6px 6px 48px rgba(0, 204, 102, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'CCBVUnchButton': {
    'id': '#CCBV-Unch-button',
    'makesInactive': ['CCBVChButton'],
    'isActive': localStorage['ccbvSyllables'] == 'False' || condition.ccbvSyllables == 'False' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(244, 93, 72)',
    'boxShadow': '6px 6px 48px rgba(244, 93, 72, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'CCCVChButton': {
    'id': '#CCCV-Ch-button',
    'makesInactive': ['CCCVUnchButton'],
    'isActive': localStorage['cccvSyllables'] == 'True' || condition.cccvSyllables == 'True' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(0, 204, 102)',
    'boxShadow': '6px 6px 48px rgba(0, 204, 102, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'CCCVUnchButton': {
    'id': '#CCCV-Unch-button',
    'makesInactive': ['CCCVChButton'],
    'isActive': localStorage['cccvSyllables'] == 'False' || condition.cccvSyllables == 'False' ? 'active' : 'inactive',
    'backgroundColor': 'rgb(244, 93, 72)',
    'boxShadow': '6px 6px 48px rgba(244, 93, 72, 0.8)',
    'borderColor': 'rgb(248, 245, 242)',
    'color': 'rgb(248, 245, 242)',
  },
  'applyButton': {
    'id': '#Apply-button',
    'backgroundColor': 'rgb(35, 35, 35)',
    'boxShadow': '6px 6px 48px rgba(244, 93, 72, 0.8)',
    'borderColor': 'rgb(249, 188, 96)',
    'color': 'rgb(249, 188, 96)',
  },
  'setButtonActive': (button) => {
    sidenav.makeActive(button);
    sidenav.setActiveStyle(button);
    sidenav.deactivateOtherButtons(button);
    sidenav.manageElements(button);
    sidenav.checkSidenav();
  },
  'makeActive': (button) => {
    sidenav[button].isActive = 'active';
  },
  'setActiveStyle': (button) => {
    document.querySelector(sidenav[button].id).style.backgroundColor = sidenav[button].backgroundColor;
    document.querySelector(sidenav[button].id).style.boxShadow = sidenav[button].boxShadow;
    document.querySelector(sidenav[button].id).style.borderColor = sidenav[button].borderColor;
    document.querySelector(sidenav[button].id).style.color = sidenav[button].color;
  },
  'deactivateOtherButtons': (button) => {
    if (sidenav[button].makesInactive != null) {
      for (item in sidenav[button].makesInactive) {
        sidenav.setButtonInactive(sidenav[button].makesInactive[item]);
      };
    };
  },
  'hideElements': (button) => {
    if (sidenav[button].hidesElements) {
      for (item in sidenav[button].hidesElements) {
        document.querySelector(sidenav[button].hidesElements[item]).style.display = 'none';
      };
    };
  },
  'unhideElements': (button) => {
    if (sidenav[button].unhidesElements) {
      for (item in sidenav[button].unhidesElements) {
        document.querySelector(sidenav[button].unhidesElements[item]).style.display = '';
      };
    };
  },
  'manageElements': (button) => {
    sidenav.hideElements(button);
    sidenav.unhideElements(button);
  },
  'setButtonInactive': (button) => {
    sidenav.makeInactive(button);
    sidenav.setDefaultStyle(button);
  },
  'makeInactive': (button) => {
    sidenav[button].isActive = 'inactive';
  },
  'setDefaultStyle': (button) => {
    document.querySelector(sidenav[button].id).style.backgroundColor = '';
    document.querySelector(sidenav[button].id).style.boxShadow = '';
    document.querySelector(sidenav[button].id).style.borderColor = '';
    document.querySelector(sidenav[button].id).style.color = '';
  },
  'apply': () => {
    if (sidenav.easyButton.isActive == 'active') {
      localStorage['difficulty'] = 'easy';
      condition.difficulty = 'easy';
      if (sidenav.BVChButton.isActive == 'active') {
        localStorage['basicVowels'] = 'True';
        condition.basicVowels = 'True';
        requestParameters.easy[1] = `&basic-vowels=${condition.basicVowels}`;
      } else {
        localStorage['basicVowels'] = 'False';
        condition.basicVowels = 'False';
        requestParameters.easy[1] = '';
      };
      if (sidenav.CVChButton.isActive == 'active') {
        localStorage['compoundVowels'] = 'True';
        condition.compoundVowels = 'True';
        requestParameters.easy[2] = `&compound-vowels=${condition.compoundVowels}`;
      } else {
        localStorage['compoundVowels'] = 'False';
        condition.compoundVowels = 'False';
        requestParameters.easy[2] = '';
      };
      if (sidenav.BCChButton.isActive == 'active') {
        localStorage['basicConsonants'] = 'True';
        condition.basicConsonants = 'True';
        requestParameters.easy[3] = `&basic-consonants=${condition.basicConsonants}`;
      } else {
        localStorage['basicConsonants'] = 'False';
        condition.basicConsonants = 'False';
        requestParameters.easy[3] = '';
      };
      if (sidenav.CCChButton.isActive == 'active') {
        localStorage['compoundConsonants'] = 'True';
        condition.compoundConsonants = 'True';
        requestParameters.easy[4] = `&compound-consonants=${condition.compoundConsonants}`;
      } else {
        localStorage['compoundConsonants'] = 'False';
        condition.compoundConsonants = 'False';
        requestParameters.easy[4] = '';
      };
      getQuestions();
    } else if (sidenav.mediumButton.isActive == 'active') {
      localStorage['difficulty'] = 'medium';
      condition.difficulty = 'medium';
      if (sidenav.BCBVChButton.isActive == 'active') {
        localStorage['bcbvSyllables'] = 'True';
        condition.bcbvSyllables = 'True';
        requestParameters.medium[1] = `&bcbv-syllables=${condition.bcbvSyllables}`;
      } else {
        localStorage['bcbvSyllables'] = 'False';
        condition.bcbvSyllables = 'False';
        requestParameters.medium[1] = '';
      };
      if (sidenav.BCCVChButton.isActive == 'active') {
        localStorage['bccvSyllables'] = 'True';
        condition.bccvSyllables = 'True';
        requestParameters.medium[2] = `&bccv-syllables=${condition.bccvSyllables}`;
      } else {
        localStorage['bccvSyllables'] = 'False';
        condition.bccvSyllables = 'False';
        requestParameters.medium[2] = '';
      };
      if (sidenav.CCBVChButton.isActive == 'active') {
        localStorage['ccbvSyllables'] = 'True';
        condition.ccbvSyllables = 'True';
        requestParameters.medium[3] = `&ccbv-syllables=${condition.ccbvSyllables}`;
      } else {
        localStorage['ccbvSyllables'] = 'False';
        condition.ccbvSyllables = 'False';
        requestParameters.medium[3] = '';
      };
      if (sidenav.CCCVChButton.isActive == 'active') {
        localStorage['cccvSyllables'] = 'True';
        condition.cccvSyllables = 'True';
        requestParameters.medium[4] = `&cccv-syllables=${condition.cccvSyllables}`;
      } else {
        localStorage['cccvSyllables'] = 'False';
        condition.cccvSyllables = 'False';
        requestParameters.medium[4] = '';
      };
      getQuestions();
    } else if (sidenav.hardButton.isActive == 'active') {
      localStorage['difficulty'] = 'hard';
      condition.difficulty = 'hard';
      getQuestions();
    };
    closeSidenav();
  },
  'blockApplying': () => {
    document.querySelector('#Apply-button').disabled = true;
    document.querySelector('#Warning-col').
      innerHTML = '<p id="Warning-message" class="warnings">At least one of the options has to be selected!</p>';
      sidenav.setActiveStyle('applyButton');
  },
  'unblockApplying': () => {
    document.querySelector('#Apply-button').disabled = false;
    document.querySelector('#Warning-col').innerHTML = '';
      sidenav.setDefaultStyle('applyButton');
  },
  'checkSidenav': () => {
    if (
      (sidenav.easyButton.isActive == 'active') &&
      (
        sidenav.BVUnchButton.isActive == 'active' &&
        sidenav.CVUnchButton.isActive == 'active' &&
        sidenav.BCUnchButton.isActive == 'active' &&
        sidenav.CCUnchButton.isActive == 'active'
      )
    ) {
        sidenav.blockApplying();
      } else if (
        (sidenav.mediumButton.isActive == 'active') &&
        (
          sidenav.BCBVUnchButton.isActive == 'active' &&
          sidenav.BCCVUnchButton.isActive == 'active' &&
          sidenav.CCBVUnchButton.isActive == 'active' &&
          sidenav.CCCVUnchButton.isActive == 'active'
        )
      ) {
          sidenav.blockApplying();
        } else {
          sidenav.unblockApplying();
        };
  },
  'setSidenav': () => {
    if (condition.difficulty == 'easy' || localStorage['difficulty'] == 'easy') {
      sidenav.setButtonActive('easyButton');
    };
    if (condition.difficulty == 'medium' || localStorage['difficulty'] == 'medium') {
      sidenav.setButtonActive('mediumButton');
    };
    if (condition.difficulty == 'hard' || localStorage['difficulty'] == 'hard') {
      sidenav.setButtonActive('hardButton');
    };
    if (condition.basicVowels == 'True' || localStorage['basicVowels'] == 'True') {
      sidenav.setButtonActive('BVChButton');
    } else {
      sidenav.setButtonActive('BVUnchButton');
    };
    if (condition.compoundVowels == 'True' || localStorage['compoundVowels'] == 'True') {
      sidenav.setButtonActive('CVChButton');
    } else {
      sidenav.setButtonActive('CVUnchButton');
    };
    if (condition.basicConsonants == 'True' || localStorage['basicConsonants'] == 'True') {
      sidenav.setButtonActive('BCChButton');
    } else {
      sidenav.setButtonActive('BCUnchButton');
    };
    if (condition.compoundConsonants == 'True' || localStorage['compoundConsonants'] == 'True') {
      sidenav.setButtonActive('CCChButton');
    } else {
      sidenav.setButtonActive('CCUnchButton');
    };
    if (condition.bcbvSyllables == 'True' || localStorage['bcbvSyllables'] == 'True') {
      sidenav.setButtonActive('BCBVChButton');
    } else {
      sidenav.setButtonActive('BCBVUnchButton');
    };
    if (condition.bccvSyllables == 'True' || localStorage['bccvSyllables'] == 'True') {
      sidenav.setButtonActive('BCCVChButton');
    } else {
      sidenav.setButtonActive('BCCVUnchButton');
    };
    if (condition.ccbvSyllables == 'True' || localStorage['ccbvSyllables'] == 'True') {
      sidenav.setButtonActive('CCBVChButton');
    } else {
      sidenav.setButtonActive('CCBVUnchButton');
    };
    if (condition.cccvSyllables == 'True' || localStorage['cccvSyllables'] == 'True') {
      sidenav.setButtonActive('CCCVChButton');
    } else {
      sidenav.setButtonActive('CCCVUnchButton');
    };
  },
};

sidenav.setSidenav();
getQuestions();
