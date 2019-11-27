import moxios from 'moxios';
import {storeFactory} from './../test/testutils';
import {setSecreteWord} from './index';
import { exportAllDeclaration } from '@babel/types';
describe('tests action creators',()=>{

    beforeEach(()=>{
        moxios.install();
    })
    afterEach(()=>{
        moxios.uninstall();
    })
    test('adds response to redux state',() =>{
        const secretWord = 'party';
        const store = storeFactory();
        moxios.wait(()=>{
            const request =  moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: secretWord
            })
        })

        return store.dispatch(setSecreteWord()).then(()=>{
            const newState = store.getState();
            expect(newState.secretWord).toBe(secretWord);
        })

    })
})