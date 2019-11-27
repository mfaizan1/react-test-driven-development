export function getLettermatchCount(guessedWord, secretWord){
    const secretWordList = new Set(secretWord.split(''));
    const guessedWordList = new Set(guessedWord.split(''));

    return [...secretWordList].filter(letter => guessedWordList.has(letter)).length;


}