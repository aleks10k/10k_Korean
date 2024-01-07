"""
    Classes defined here:
        EasyDifficulty
        MediumDifficulty
        HardDifficulty

    Functions defined here:
        generate_easy_answer_options
        generate_easy_questions
        generate_medium_answer_options
        generate_medium_questions

    Hard questions are generated by the class's methods rather functions.
"""

from webapp.models import BASIC_VOWELS, BASIC_CONSONANTS, COMPOUND_VOWELS, COMPOUND_CONSONANTS, EASY_LEVEL_SOUNDS
from webapp.models import BCBV_SYLLABLES, BCCV_SYLLABLES, CCBV_SYLLABLES, CCCV_SYLLABLES, MEDIUM_LEVEL_SOUNDS
from webapp.models import INITIAL_NUMBERS, MEDIAL_NUMBERS, FINAL_NUMBERS
from random import choice, shuffle, randint


# EASY DIFFICULTY ......................................................................................................
class EasyDifficulty:
    """
    Used to represent easy difficulty with a set of easy questions.

    Attributes
    ..........
        basic_vowels: bool
            defines the presence of the category in a question set (default is True)
        compound_vowels: bool
            defines the presence of the category in a question set (default is True)
        basic_consonants: bool
            defines the presence of the category in a question set (default is True)
        compound_consonants: bool
            defines the presence of the category in a question set (default is True)
        letter_list: list
            letters used as a question set (default is [])
            for example:
            ['ㄲ', 'ㄸ', 'ㅃ', 'ㅆ',... etc.

    Methods
    .......
        generate_letter_list()
            forms the letter list depending on the attributes value
    """

    def __init__(
                self,
                basic_vowels=True,
                compound_vowels=True,
                basic_consonants=True,
                compound_consonants=True
    ):
        """
        :param basic_vowels: bool
            sets the corresponding attribute value (default is True)
        :param compound_vowels: bool
            sets the corresponding attribute value (default is True)
        :param basic_consonants: bool
            sets the corresponding attribute value (default is True)
        :param compound_consonants: bool
            sets the corresponding attribute value (default is True)
        """

        self.basic_vowels = basic_vowels
        self.compound_vowels = compound_vowels
        self.basic_consonants = basic_consonants
        self.compound_consonants = compound_consonants
        self.letter_list = []

    def generate_letter_list(self):
        """
        Forms the letter list depending on the attributes value.

        :return: list
            for example:
            ['ㄲ', 'ㄸ', 'ㅃ', 'ㅆ',... etc.
        """

        if self.basic_vowels:
            self.letter_list.extend(BASIC_VOWELS)
        if self.compound_vowels:
            self.letter_list.extend(COMPOUND_VOWELS)
        if self.basic_consonants:
            self.letter_list.extend(BASIC_CONSONANTS)
        if self.compound_consonants:
            self.letter_list.extend(COMPOUND_CONSONANTS)
        return self.letter_list


def generate_easy_answer_options(letter, answer_options_number=4):
    """
    Forms answer options to every question.

    :param letter: str
        a letter used as a question
    :param answer_options_number: int
        a number of how many options have to be generated for a question (default is 4)
    :return: list
        for example:
        ['jj', 'tt', 'kk', 'ss']
    """

    answer_options = set()
    answer_options.add(EASY_LEVEL_SOUNDS[letter])

    while len(answer_options) < answer_options_number:

        if letter in BASIC_VOWELS:
            random_letter = choice(BASIC_VOWELS)
            answer_options.add(EASY_LEVEL_SOUNDS[random_letter])

        if letter in COMPOUND_VOWELS:
            random_letter = choice(COMPOUND_VOWELS)
            answer_options.add(EASY_LEVEL_SOUNDS[random_letter])

        if letter in BASIC_CONSONANTS:
            random_letter = choice(BASIC_CONSONANTS)
            answer_options.add(EASY_LEVEL_SOUNDS[random_letter])
        if letter in COMPOUND_CONSONANTS:
            random_letter = choice(COMPOUND_CONSONANTS) if answer_options_number <= 4 \
                else choice(COMPOUND_CONSONANTS + BASIC_CONSONANTS)  # because the compound consonants are just 5
            answer_options.add(EASY_LEVEL_SOUNDS[random_letter])

    return list(answer_options)


def generate_easy_questions(letter_list, answer_options_number=4):
    """
    Forms a complete question list with answer options that is ready to be sent to a client.

    :param letter_list: list
        the list of letters of chosen categories
    :param answer_options_number: int
        a number of answer options that goes as a parameter
        to generate_easy_answer_options function used in the
        current function (default is 4)
    :return: list
        for example:
        [{'question': 'ㅉ', 'answer': 'jj', 'answer_options': ['pp', 'tt', 'jj', 'ss']},... etc.
    """

    question_list = list()
    for letter in letter_list:
        answer = EASY_LEVEL_SOUNDS[letter]
        answer_options = generate_easy_answer_options(letter, answer_options_number)
        question_list.append({
            'question': letter,
            'answer': answer,
            'answer_options': answer_options,
        })
    shuffle(question_list)
    shuffle(question_list)
    return question_list


# MEDIUM DIFFICULTY ....................................................................................................
class MediumDifficulty:
    """
    Used to represent medium difficulty with a set of medium questions.

    Attributes
    ..........
        bcbv_syllables: bool
            defines the presence of the category in a question set (default is True)
        bccv_syllables: bool
            defines the presence of the category in a question set (default is True)
        ccbv_syllables: bool
            defines the presence of the category in a question set (default is True)
        cccv_syllables: bool
            defines the presence of the category in a question set (default is True)
        syllable_list: list
            syllables used as a question set (default is [])
            for example:
            ['가', '갸', '거', '겨',... etc.

    Methods
    .......
        generate_syllable_list()
            forms the syllable list depending on the attributes value
    """

    def __init__(
                self,
                bcbv_syllables=True,
                bccv_syllables=True,
                ccbv_syllables=True,
                cccv_syllables=True
    ):
        """
        :param bcbv_syllables: bool
            sets the corresponding attribute value (default is True)
        :param bccv_syllables: bool
            sets the corresponding attribute value (default is True)
        :param ccbv_syllables: bool
            sets the corresponding attribute value (default is True)
        :param cccv_syllables: bool
            sets the corresponding attribute value (default is True)
        """

        self.bcbv_syllables = bcbv_syllables
        self.bccv_syllables = bccv_syllables
        self.ccbv_syllables = ccbv_syllables
        self.cccv_syllables = cccv_syllables
        self.syllable_list = []

    def generate_syllable_list(self):
        """
        Forms the syllable list depending on the attributes value.

        :return: list
            for example:
            ['가', '갸', '거', '겨',... etc.
        """

        if self.bcbv_syllables:
            self.syllable_list.extend(BCBV_SYLLABLES)
        if self.bccv_syllables:
            self.syllable_list.extend(BCCV_SYLLABLES)
        if self.ccbv_syllables:
            self.syllable_list.extend(CCBV_SYLLABLES)
        if self.cccv_syllables:
            self.syllable_list.extend(CCCV_SYLLABLES)
        return self.syllable_list


def generate_medium_answer_options(syllable, answer_options_number=4):
    """
    Forms answer options to every question.

    :param syllable: str
        a syllable used as a question
    :param answer_options_number: int
        a number of how many options have to be generated for a question (default is 4)
    :return: list
        for example:
        ['ga', 'nyeo', 'yo', 'meu']
    """

    answer_options = set()
    answer_options.add(MEDIUM_LEVEL_SOUNDS[syllable])

    while len(answer_options) < answer_options_number:

        if syllable in BCBV_SYLLABLES:
            random_syllable = choice(BCBV_SYLLABLES)
            answer_options.add(MEDIUM_LEVEL_SOUNDS[random_syllable])

        if syllable in BCCV_SYLLABLES:
            random_syllable = choice(BCCV_SYLLABLES)
            answer_options.add(MEDIUM_LEVEL_SOUNDS[random_syllable])

        if syllable in CCBV_SYLLABLES:
            random_syllable = choice(CCBV_SYLLABLES)
            answer_options.add(MEDIUM_LEVEL_SOUNDS[random_syllable])

        if syllable in CCCV_SYLLABLES:
            random_syllable = choice(CCCV_SYLLABLES)
            answer_options.add(MEDIUM_LEVEL_SOUNDS[random_syllable])

    return list(answer_options)


def generate_medium_questions(syllable_list, answer_options_number=4):
    """
    Forms a complete question list with answer options that is ready to be sent to a client.

    :param syllable_list: list
        the list of syllables of chosen categories
    :param answer_options_number: int
        a number of answer options that goes as a parameter
        to generate_medium_answer_options function used in the
        current function (default is 4)
    :return: list
        for example:
        [{'question': '가', 'answer': 'ga', 'answer_options': ['teo', 'yu', 'ga', 'keu']},... etc.
    """

    question_list = list()
    for syllable in syllable_list:
        answer = MEDIUM_LEVEL_SOUNDS[syllable]
        answer_options = generate_medium_answer_options(syllable, answer_options_number)
        question_list.append({
            'question': syllable,
            'answer': answer,
            'answer_options': answer_options,
        })
    shuffle(question_list)
    shuffle(question_list)
    return question_list


# HARD DIFFICULTY ......................................................................................................
class HardDifficulty:
    """
    Used to represent hard difficulty with a set of hard questions.

    Works slightly differently than easy and medium ones.
    Doesn't use any outer data and generate syllables from scratch.

    Attributes
    ..........
        syllable_and_sound_dictionary: dict
            used when forming an answer option list
            and a final question list with a question set (default is {})
            for example:
            {'쟹': 'jyaeng', '뿾': 'ppwot',... etc.
        syllable_list: list
            syllables used as a question set (default is [])
            for example:
            ['쟹', '뿾',... etc.

    Methods
    .......
        generate_syllable_and_sound_list()
            fills the empty list and dictionary
        generate_hard_answer_options()
            forms answer options to every question
        generate_hard_questions()
            forms a complete question list
    """

    def __init__(self):
        self.syllable_and_sound_dictionary = {}
        self.syllable_list = []

    def generate_syllable_and_sound_list(self):
        """
         Fills the empty list and dictionary with 20 randomly generated syllables and their sounds.

        :return: None
        """

        for i in range(20):
            initial_number = randint(0, 18)
            medial_number = randint(0, 20)
            final_number = randint(1, 27)
            syllable = chr((initial_number * 588) + (medial_number * 28) + final_number + 44032)
            sound = INITIAL_NUMBERS[initial_number] + MEDIAL_NUMBERS[medial_number] + FINAL_NUMBERS[final_number]
            self.syllable_and_sound_dictionary[syllable] = sound
            self.syllable_list.append(syllable)

    def generate_hard_answer_options(self, syllable, answer_options_number=4):
        """
        Forms answer options to every question.

        :param syllable: str
            a syllable used as a question
        :param answer_options_number:
            a number of how many options have to be generated for a question (default is 4)
        :return: list
            for example:
            ['deok', 'euk', 'jeut', 'kaem']
        """

        answer_options = set()
        answer_options.add(self.syllable_and_sound_dictionary[syllable])

        while len(answer_options) < answer_options_number:
            random_syllable = choice(self.syllable_list)
            answer_options.add(self.syllable_and_sound_dictionary[random_syllable])

        return list(answer_options)

    def generate_hard_questions(self, answer_options_number=4):
        """
        Forms a complete question list with answer options that is ready to be sent to a client.

        :param answer_options_number: int
            a number of answer options that goes as a parameter
            to generate_hard_answer_options method used in the
            current method (default is 4)
        :return: list
            for example:
            [{'question': '즜', 'answer': 'jeut', 'answer_options': ['deok', 'euk', 'jeut', 'kaem']},... etc.
        """

        question_list = list()
        for syllable in self.syllable_list:
            answer = self.syllable_and_sound_dictionary[syllable]
            answer_options = self.generate_hard_answer_options(syllable, answer_options_number)
            question_list.append({
                'question': syllable,
                'answer': answer,
                'answer_options': answer_options,
            })
        shuffle(question_list)
        shuffle(question_list)
        return question_list
