
import stringsModule from './strings';
const { getStringByLang } = stringsModule;

const strings = {
    en: {
     submit: 'Submit',
    },
    emoji: {
     submit: '🚀',
    },
    mermish: {

    }
  }


describe('it tests language heper',()=>{
    const mockWarn = jest.fn()
    const originalWarn = require('console').warn;
    beforeEach(()=>{
        console.warn = mockWarn;
    })
    afterEach(()=>{
        console.warn = originalWarn;
    })
    test('returns correct string for english',()=>{
        expect(getStringByLang('en','submit',strings)).toBe('Submit')
        expect(mockWarn).not.toHaveBeenCalled();

    })
    test('returns correct string for emoji',()=>{
        expect(getStringByLang('emoji','submit',strings)).toBe('🚀')
        expect(mockWarn).not.toHaveBeenCalled();
    })
    test('returns english string when no lanuage defined',()=>{
        expect(getStringByLang('noLanguage','submit',strings)).toBe('Submit')
        expect(mockWarn).toHaveBeenCalled();
    })
    test('returns english submit key when doesn\'t exists fot lanuage',()=>{
        expect(getStringByLang('mermish','submit',strings)).toBe('Submit')
        expect(mockWarn).toHaveBeenCalled();
    })
})