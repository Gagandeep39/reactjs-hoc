import React, { Component } from 'react';
import classes from './Person.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import withClassTwo from '../../../hoc/withClassTwo';
import PropTypes from 'prop-types';

class Person extends Component {

  // Lifecycle hook that excutes after component is created
  componentDidMount() {
    // This will focus the last element
    // Focus will be executed for all person, tand in the end last person input will be in focus
    this.inputRef.focus();
  }

  render() {
    console.log('[Person.js] Rendering');

    return (
      <Auxiliary>
        <p> I'm a Person!</p>
        <p>
          Name provided as attribute: {this.props.name}, age: {this.props.age}{' '}
        </p>
        <p>Age {Math.floor(Math.random() * 100)}</p>
        <p> {this.props.children} </p>
        <button onClick={this.props.deleteButton}>Delete</button>
        <br />
        <input type='text' ref={(inputElement) => {this.inputRef = inputElement}} onChange={this.props.change} />
      </Auxiliary>
    );
  }
}

// To test the working, give name a a numebr and check the console for warning
Person.propTypes = {
  click: PropTypes.func, // Pointer to a function
  name: PropTypes.string,
  age: PropTypes.number,
  change: PropTypes.func
};
export default withClassTwo(Person, classes.Person);
