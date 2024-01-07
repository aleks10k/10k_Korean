from webapp import app
from webapp.my_module import \
    EasyDifficulty, MediumDifficulty, HardDifficulty, generate_easy_questions, generate_medium_questions
from flask import render_template, request


@app.route('/')
def app_page():
    return render_template('app.html')


@app.route('/get_questions', methods=['POST', 'GET'])
def get_questions():
    """
    Builds up a question set depending on a request.

    :return: list
    """
    difficulty = request.form.get('difficulty', 'medium')

    if difficulty == 'easy':
        basic_vow = request.form.get('basic-vowels', False)
        compound_vow = request.form.get('compound-vowels', False)
        basic_cons = request.form.get('basic-consonants', False)
        compound_cons = request.form.get('compound-consonants', False)

        if basic_vow is False and compound_vow is False and basic_cons is False and compound_cons is False:
            difficulty = EasyDifficulty(False, False, False, True)
            letter_list = difficulty.generate_letter_list()
            questions = generate_easy_questions(letter_list)
            return questions

        difficulty = EasyDifficulty(basic_vow, compound_vow, basic_cons, compound_cons)
        letter_list = difficulty.generate_letter_list()
        questions = generate_easy_questions(letter_list)
        return questions

    if difficulty == 'medium':
        bcbv_syllables = request.form.get('bcbv-syllables', False)
        bccv_syllables = request.form.get('bccv-syllables', False)
        ccbv_syllables = request.form.get('ccbv-syllables', False)
        cccv_syllables = request.form.get('cccv-syllables', False)

        if bcbv_syllables is False and bccv_syllables is False and ccbv_syllables is False and cccv_syllables is False:
            difficulty = MediumDifficulty(False, False, False, True)
            syllable_list = difficulty.generate_syllable_list()
            questions = generate_medium_questions(syllable_list)
            return questions

        difficulty = MediumDifficulty(bcbv_syllables, bccv_syllables, ccbv_syllables, cccv_syllables)
        syllable_list = difficulty.generate_syllable_list()
        questions = generate_medium_questions(syllable_list)
        return questions

    if difficulty == 'hard':
        difficulty = HardDifficulty()
        difficulty.generate_syllable_and_sound_list()
        questions = difficulty.generate_hard_questions()
        return questions


@app.route('/about', methods=['POST', 'GET'])
def about_page():
    return render_template('about.html')


@app.route('/theory', methods=['POST', 'GET'])
def theory_page():
    return render_template('theory.html')
