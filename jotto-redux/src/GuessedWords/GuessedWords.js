import React from 'react'
import PropTypes from 'prop-types';

const GuessedWords = (props)  => {

    let content;
    let list;
    if (props.guessedWords.length === 0){
        content =   <span data-test='guess-word-instructions'>
            try to guess the secret word
        </span>
    } else if(props.guessedWords.length> 0){
        list =  props.guessedWords.map( (elem,index) => (
            <div data-test="guessed-word" key={`${elem.guessedWord}-${index}`}>
                <span>{elem.guessedWord}</span>:<span>{elem.letterMatch}</span>
            </div>
        ))
    }
    
    return (
        <div data-test="component-guessed-words">
            {content}
            { props.guessedWords.length > 0 ? <div data-test="guessed-words">
                {list}
            </div> : '' }
        </div>
    )
}

GuessedWords.propTypes = {
    guessedWords : PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatch: PropTypes.number.isRequired 
        })
    ).isRequired
}
export default GuessedWords;