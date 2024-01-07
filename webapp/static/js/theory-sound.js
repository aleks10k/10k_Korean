
let medialVowels = document.getElementsByClassName("medial-vowels");

for (letter in medialVowels) {
    if (typeof(medialVowels[letter]) == 'object') {
      medialVowels[letter].addEventListener('click', (event) => {
      const sound = new Audio(`static/sounds/letters/${event.target.id}.mp3`);
      sound.play();
    });
  };
};

let initialConsonants = document.getElementsByClassName("initial-consonants");

for (letter in initialConsonants) {
    if (typeof(initialConsonants[letter]) == 'object') {
      initialConsonants[letter].addEventListener('click', (event) => {
      const sound = new Audio(`static/sounds/letters/${event.target.id}.mp3`);
      sound.play();
    });
  };
};

let syllables = document.getElementsByClassName("syllables");

for (syllable in syllables) {
    if (typeof(syllables[syllable]) == 'object') {
      syllables[syllable].addEventListener('click', (event) => {
      const sound = new Audio(`static/sounds/syllables/${event.target.id}.mp3`);
      sound.play();
    });
  };
};

let finalConsonants = document.getElementsByClassName("final-consonants");

for (syllable in finalConsonants) {
    if (typeof(finalConsonants[syllable]) == 'object') {
      finalConsonants[syllable].addEventListener('click', (event) => {
      const sound = new Audio(`static/sounds/patchims/${event.target.id}.mp3`);
      sound.play();
    });
  };
};

let medialVowelsMobile = document.getElementsByClassName("medial-vowels-mobile");

for (letter in medialVowelsMobile) {
    if (typeof(medialVowelsMobile[letter]) == 'object') {
      medialVowelsMobile[letter].addEventListener('click', (event) => {
      const sound = new Audio(`static/sounds/letters/${event.target.id.slice(2)}.mp3`);
      sound.play();
    });
  };
};

let initialConsonantsMobile = document.getElementsByClassName("initial-consonants-mobile");

for (letter in initialConsonantsMobile) {
    if (typeof(initialConsonantsMobile[letter]) == 'object') {
      initialConsonantsMobile[letter].addEventListener('click', (event) => {
      const sound = new Audio(`static/sounds/letters/${event.target.id.slice(2)}.mp3`);
      sound.play();
    });
  };
};

let finalConsonantsMobile = document.getElementsByClassName("final-consonants-mobile");

for (syllable in finalConsonantsMobile) {
    if (typeof(finalConsonantsMobile[syllable]) == 'object') {
      finalConsonantsMobile[syllable].addEventListener('click', (event) => {
      const sound = new Audio(`static/sounds/patchims/${event.target.id.slice(2)}.mp3`);
      sound.play();
    });
  };
};
