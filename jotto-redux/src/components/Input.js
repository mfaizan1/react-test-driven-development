import React, { Component } from 'react';
import { connect } from 'react-redux';
import {guessWord} from './../actions/index'



export class UnConnectedInput extends Component {
    state = {
        guessWord: ''
    }
    clickHandeler = (e) =>{
        e.preventDefault();
        const {guessWord} = this.state;
        if(guessWord && guessWord.length > 0)
        {
            this.props.guessWord(this.state.guessWord);
            this.setState({guessWord: ''})

        }          
    }
    render() {
        const content  = this.props.success ? 
        <h1 data-test='success-msg'>Congrats you guessed it</h1>
            : (
                <form>
                <input name='guess' data-test='guess-input' value={this.state.guessWord} onChange={(e)=>this.setState({guessWord: e.target.value})} />
                <button name='submit' data-test='submit-btn' onClick={(e)=>this.clickHandeler(e)}>Submit</button>
                </form>
            )
        return (
            <div data-test='input-component'>
                {content}
            </div>
        );
    }
}
const mapStateToProps = ({success}) => {
    // console.log(success)
    return { success };
}

export default connect(mapStateToProps,{guessWord})(UnConnectedInput);