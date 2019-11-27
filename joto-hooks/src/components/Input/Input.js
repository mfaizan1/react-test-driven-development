import React from 'react';
// import {guessWord} from './../actions/index'
import PropTypes from 'prop-types';
import languageContext from './../../contexts/LanguageContext';
import strings from './../../utils/strings';
import successContext from './../../contexts/successContext';
import guessedWordContext from './../../contexts/guessedWords';
import { getLettermatchCount } from '../../utils';




function Input ({secretWord})  {
    const language = React.useContext(languageContext);
    const [currentGuess, setCurrentGuess] = React.useState('');
    const [success, setSuccess] = successContext.useSuccess();
    const [guessedWords, setGuessedWords] = guessedWordContext.useGuessedWords();
    if (success){
        return null;
    }
    const onClickHandeler = (event) => {
        event.preventDefault();
        const letterMatch = getLettermatchCount(currentGuess, secretWord);
        setGuessedWords([...guessedWords, {guessedWord: currentGuess, letterMatch}])
        if(currentGuess === secretWord){
            setSuccess(true);
        }
        setCurrentGuess('');
    }
    return(
        <div data-test='input-comp'>
            <input
            data-test='input'
            type='text'
            placeholder={strings.getStringByLang(language,'guessInputPlaceholder')}
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
            />
            <button data-test='btn' onClick={(e)=> onClickHandeler(e)}>
                {strings.getStringByLang(language,'submit')}
            </button>
        </div>
    );
    }

Input.propTypes = {
    secretWord: PropTypes.string.isRequired
}
export default Input;