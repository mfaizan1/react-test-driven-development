import React from 'react';
import {shallow, mount} from 'enzyme';

import successContext from './successContext';


const FucntionalComponent = () => {
    successContext.useSuccess();
    return <div />
}

test('useSuccess should thwor error when called out side success provider',()=> {
    expect(()=> {
        shallow(<FucntionalComponent />)
    }).toThrow('useContext must be used within SuccessProvider');

});

test('useSuccess  does not throw an error when called from within a provider',() => {
    expect(()=> {
        mount(
            <successContext.SuccessProvider>
                <FucntionalComponent />
            </successContext.SuccessProvider>
        )
    }).not.toThrow('useContext must be used within SuccessProvider');

})