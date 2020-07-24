import React, { Component } from 'react';
import classes from './Person.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import withClassTwo from '../../../hoc/withClassTwo';
import PropTypes from 'prop-types';

class Person extends Component {
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
        <input type='text' onChange={this.props.change} />
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
