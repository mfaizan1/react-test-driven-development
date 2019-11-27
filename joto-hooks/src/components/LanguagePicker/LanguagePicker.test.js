import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr, checkProps} from './../../test/testutils';
import LanguagePicker from './LanguagePicker'

const mockSetLanguage = jest.fn();

const setup = () => {
    return shallow(<LanguagePicker setLanguage={mockSetLanguage} />)
}
describe('tests language picker',()=>{

    test('renders without error',()=>{
        const wrapper = setup();
        const languagePicker =  findByTestAttr(wrapper, 'language-picker');

        expect(languagePicker.length).toBe(1);
    })
    test('does not throw a warning with expected props',()=>{
        checkProps(LanguagePicker, {setLanguage: mockSetLanguage})
    })
    test('renders non zero number of language icons',()=>{
        const wrapper = setup();
        const languageIcon = findByTestAttr(wrapper, 'language-icon');
        expect(languageIcon.length).toBeGreaterThan(0);
        
    })
    test('calls setLanguage prop on click',()=>{
        const wrapper = setup();
        const languageIcon = findByTestAttr(wrapper, 'language-icon');
        languageIcon.first().simulate('click');
        expect(mockSetLanguage).toHaveBeenCalled();

    })
})