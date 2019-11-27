import React from 'react';
import './App.css';
import hookActions from './actions/hookActions';
import languageContext from './contexts/LanguageContext'
import LanguagePicker from './components/LanguagePicker/LanguagePicker';
import Congrats from './components/Congrats/Congrats';
import GuessedWords from './components/GuessedWords/GuessedWords';
import Input from './components/Input/Input'
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWords';


const reducer = (state, action) =>{
  switch(action.type){
    case 'setSecretWord':
      return {...state, secretWord: action.payload}
    case 'setLanguage':
      return {...state, language: action.payload}
    default: 
     throw new Error(`Invalid action type: ${action.type}`);
  }
}
function App () {

  const [state, dispatch] = React.useReducer(
    reducer,
    {secretWord : ''}
  )

  const setSecretWord = (secretWord) => dispatch ({type: 'setSecretWord', payload: secretWord});
  const setLanguage = (language) => dispatch({type: 'setLanguage', payload: language})
  React.useEffect(()=> {hookActions.getSecretWord(setSecretWord)}, [])
    if( !state.secretWord || state.secretWord.length === 0){
      return <div className='spinner' data-test='spinner' >
        <p>Data is loading</p>
      </div>
    }
    return (
      <div className="App" data-test="app">
        <h1>{state.secretWord}</h1>
        <languageContext.Provider value={state.language}>
          <LanguagePicker setLanguage={setLanguage} />
          <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats /> 
             <Input secretWord={state.secretWord} />
          </successContext.SuccessProvider>
    
          <GuessedWords/>
        </guessedWordsContext.GuessedWordsProvider>

        </languageContext.Provider>


      </div>
      );
}
export default App;
