  
const languageStrings = {
    en: {
     congrats: 'Congratulations! You guessed the word!',
     submit: 'Submit',
     guessPrompt: 'Try to guess the secret word!',
     guessInputPlaceholder: 'enter guess',
     guessColumnHeader: 'Guessed Words',
     guessedWords: 'Guesses',
     matchingLettersColumnHeader: 'Matching Letters',
    },
    emoji: {
     congrats: '🎯🎉',
     submit: '🚀',
     guessPrompt: '🤔🤫🔤',
     guessInputPlaceholder: '⌨️🤔',
     guessedWords: '🤷‍🔤',
     guessColumnHeader: '🤷‍',
     matchingLettersColumnHeader: '✅',
    }
  }


function getStringByLang(language,code, strings=languageStrings) {
    if(!strings[language] || !strings[language][code]){
        console.warn(`Couldn't get string for language : [${language}] and key: [${code}]`)
        return strings.en[code];
    }
    return strings[language][code]

  }


  export default {
      getStringByLang,
  }