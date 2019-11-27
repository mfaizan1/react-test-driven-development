import React from 'react';
import './App.css';
import Congrats from './Congrats/Congrats';
import GuessedWords from './GuessedWords/GuessedWords';
import Input from './components/Input'
import {connect} from 'react-redux';
import {setSecreteWord} from './actions/index'

export class UnconnectedApp extends React.Component {

  componentDidMount(){
    this.props.setSecreteWord();
  }
  render(){
    return (
      <div className="App">
        <Input />
        <Congrats success={this.props.success} />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
      );
  }

}
const mapStateToProps = ({guessedWords, success, secretWord}) => {
  // console.log(success)
  return { guessedWords, success, secretWord };
}

export default connect(mapStateToProps, {setSecreteWord})(UnconnectedApp);
