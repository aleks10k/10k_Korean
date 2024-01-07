
let darkMode = localStorage['darkMode'] == 'true' ? true : false;
if (darkMode == false) {darkModeOFF();} else {darkModeON();};
let serifFont = localStorage['serifFont'] == 'true' ? true : false;
if (serifFont == false) {serifFontOFF();} else {serifFontON();};
let muted = localStorage['muted'] == 'true' ? true : false;
if (muted == false) {unmute();} else {mute();};

document.querySelector('#DarkMode-button').addEventListener('click', () => {switchDarkMode();});
document.querySelector('#Mute-button').addEventListener('click', () => {switchMuting();});
document.querySelector('#Font-button').addEventListener('click', () => {switchSerifFont();});
document.querySelector('#Settings-button').addEventListener('click', () => {switchSidenav();});
document.querySelector('#Sidenav-close-button').addEventListener('click', () => {switchSidenav();});
document.querySelector('#Sidenav-close-button-mobile').addEventListener('click', () => {switchSidenav();});

document.querySelector('#DarkMode-button-mobile').addEventListener('click', () => {switchDarkMode();});
document.querySelector('#Mute-button-mobile').addEventListener('click', () => {switchMuting();});
document.querySelector('#Font-button-mobile').addEventListener('click', () => {switchSerifFont();});
document.querySelector('#Settings-button-mobile').addEventListener('click', () => {switchSidenav();});

function darkModeON() {
  document.body.style.backgroundColor = 'rgb(35, 35, 35)';
  document.querySelector('#Instruction-text').style.color = 'rgba(249, 188, 96, 0.5)';
  document.querySelector('#Question').style.color = 'rgb(249, 188, 96)';
  document.querySelector('#Stat-text').style.color = 'rgb(248, 245, 242)';
  document.querySelector('#Stat-empty').style.borderColor = 'rgb(35, 35, 35)';
  document.querySelector('#Stat-empty').style.backgroundColor = 'rgb(35, 35, 35)';
  document.querySelector('#Link-about').style.color = 'rgba(249, 188, 96, 0.75)';
  document.querySelector('#Link-about').style.borderColor = 'rgba(249, 188, 96, 0.5)';
  document.querySelector('#Link-theory').style.color = 'rgba(249, 188, 96, 0.75)';
  document.querySelector('#Link-theory').style.borderColor = 'rgba(249, 188, 96, 0.5)';
  localStorage['darkMode'] = 'true';
  darkMode = true;
};

function darkModeOFF() {
  document.body.style.backgroundColor = '';
  document.querySelector('#Instruction-text').style.color = '';
  document.querySelector('#Question').style.color = '';
  document.querySelector('#Stat-text').style.color = '';
  document.querySelector('#Stat-empty').style.borderColor = '';
  document.querySelector('#Stat-empty').style.backgroundColor = '';
  document.querySelector('#Link-about').style.color = '';
  document.querySelector('#Link-about').style.borderColor = '';
  document.querySelector('#Link-theory').style.color = '';
  document.querySelector('#Link-theory').style.borderColor = '';
  localStorage['darkMode'] = 'false';
  darkMode = false;
};

function switchDarkMode() {
  if (darkMode == false) {darkModeON();} else {darkModeOFF();};
};

function openSidenav() {
  if (window.innerWidth < 550) {
    document.querySelector('#Sidenav').style.width = '85%';
    document.querySelector('#Sidenav').style.borderRight = '2px solid rgb(249, 188, 96)';
  } else {
    document.querySelector('#Sidenav').style.width = '33.33%';
    document.querySelector('#Sidenav').style.borderRight = '3px solid rgb(249, 188, 96)';
  };
};

function closeSidenav() {
  document.querySelector('#Sidenav').style.width = '';
  document.querySelector('#Sidenav').style.borderRight = '0px solid rgb(249, 188, 96)';
};

function switchSidenav() {
  if (document.querySelector('#Sidenav').style.width == '') {
    openSidenav();
  } else {
    closeSidenav();
  };
};

function mute() {
  document.querySelector('#Mute-button').innerHTML = 'volume_off';
  document.querySelector('#Mute-button-mobile').innerHTML = 'volume_off';
  localStorage['muted'] = 'true';
  muted = true;
};

function unmute() {
  document.querySelector('#Mute-button').innerHTML = 'volume_up';
  document.querySelector('#Mute-button-mobile').innerHTML = 'volume_up';
  localStorage['muted'] = 'false';
  muted = false;
};

function switchMuting() {
  if (muted == false) {mute();} else {unmute();};
};

function serifFontON() {
  document.querySelector('#Question').style.fontFamily = "'Noto Serif KR', serif";
  localStorage['serifFont'] = 'true';
  serifFont = true;
};

function serifFontOFF() {
  document.querySelector('#Question').style.fontFamily = '';
  localStorage['serifFont'] = 'false';
  serifFont = false;
};

function switchSerifFont() {
  if (serifFont == false) {serifFontON();} else {serifFontOFF();};
};

function changeOptionButtonColor(color) {
  document.querySelector(`#${event['target']['id']}`).style.backgroundColor = `${color}`
  document.querySelector(`#${event['target']['id']}`).style.color = 'rgb(248, 245, 242)';
};

function changeAllOptionButtonsColor(color) {
  document.querySelector('#Option-button-0').style.backgroundColor = ''
  document.querySelector('#Option-button-0').style.color = ''
  document.querySelector('#Option-button-1').style.backgroundColor = ''
  document.querySelector('#Option-button-1').style.color = ''
  document.querySelector('#Option-button-2').style.backgroundColor = ''
  document.querySelector('#Option-button-2').style.color = ''
  document.querySelector('#Option-button-3').style.backgroundColor = ''
  document.querySelector('#Option-button-3').style.color = ''
};
