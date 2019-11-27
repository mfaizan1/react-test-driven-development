
import {getLettermatchCount} from './index';


describe('getLetterMatchCount', ()=>{
    const secretWord = 'party';
    test('returns correct count when no matching letters',()=> {
        const letterMatchCount = getLettermatchCount('bones',secretWord);
        expect(letterMatchCount).toBe(0);
    })

    test('returns correct count when 3 matching letters',()=> {
        const letterMatchCount = getLettermatchCount('train',secretWord);
        expect(letterMatchCount).toBe(3);
    })


    test('returns correct count when duplicate matching letters',()=> {
        const letterMatchCount = getLettermatchCount('parka',secretWord);
        expect(letterMatchCount).toBe(3);
    })

})