import moxios from 'moxios';
import { getSecretWord } from './hookActions';

describe('it tests hook actions',()=>{
    beforeEach(()=>{
        moxios.install();
    })
    afterEach(()=>{
        moxios.uninstall();
    })
    it('setSecretWord is called when axios request is finished', async ()=>{
        const secretWord = 'party';
        moxios.wait(()=>{
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: secretWord
            });
        });
        const mockSetSecWord  =  jest.fn();
        await getSecretWord(mockSetSecWord);

        expect(mockSetSecWord).toHaveBeenCalledWith(secretWord);

    })

})