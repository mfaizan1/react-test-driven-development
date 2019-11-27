import React from 'react';
import {shallow, mount} from 'enzyme';

import {GuessedWordsProvider,useGuessedWords} from './guessedWords';



const FucntionalComponent = () => {
    useGuessedWords();
    return <div />
}

test('useSuccess should thwor error when called out side success provider',()=> {
    expect(()=> {
        shallow(<FucntionalComponent />)
    }).toThrow('useContext must be used within GuessedWordsProvider');

});

test('useSuccess  does not throw an error when called from within a provider',() => {
    expect(()=> {
        mount(
            <GuessedWordsProvider>
                <FucntionalComponent />
            </GuessedWordsProvider>
        )
    }).not.toThrow('useContext must be used within SuccessProvider');

})