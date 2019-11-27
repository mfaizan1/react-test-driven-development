import React from 'react'
import languageContext from './../../contexts/LanguageContext';
import strings from './../../utils/strings';
import guessedWordsContext  from './../../contexts/guessedWords';


const GuessedWords = ()  => {
    const language = React.useContext(languageContext);
    const [guessedWords] = guessedWordsContext.useGuessedWords();
    let content;
    let list;
    if (!guessedWords || guessedWords.length === 0){
        content =   <span data-test='guess-word-instructions'>
            {strings.getStringByLang(language, 'guessPrompt')}
        </span>
    } else if(guessedWords.length> 0){
        list =  guessedWords.map( (elem,index) => (
            <div data-test="guessed-word" key={`${elem.guessedWord}-${index}`}>
                <span>{elem.guessedWord}</span>:<span>{elem.letterMatch}</span>
            </div>
        ))
    }
    
    return (
        <div data-test="component-guessed-words">
            {content}
            { guessedWords.length > 0 ? <div data-test="guessed-words">
                {list}
            </div> : '' }
        </div>
    )
}

export default GuessedWords;