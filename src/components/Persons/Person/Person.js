import React, { Component } from 'react';
import classes from './Person.module.css';

class Person extends Component {
  render() {
    console.log('[Person.js] Rendering');

    return (
      <div className={classes.Person}>
        <p> I'm a Person!</p>
        <p>
          Name provided as attribute: {this.props.name}, age: {this.props.age}{' '}
        </p>
        <p>Age {Math.floor(Math.random() * 100)}</p>
        <p> {this.props.children} </p>
        <button onClick={this.props.deleteButton}>Delete</button>
        <br />
        <input type='text' onChange={this.props.change} />
      </div>
    );
  }
}

export default Person;
