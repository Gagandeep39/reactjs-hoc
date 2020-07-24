import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  constructor(props) {
    super(props);
    // Initial State
    // Can be declared inside or outside of constructor
    // If declared ouside then it will act as executed in constructor by itself
    this.state = {
      persons: [
        { id: 'dfghyj', name: 'Gagan', age: 0 },
        { id: 'dgfhj', name: 'Ralts', age: 1 },
        { id: 'dfxgthy', name: 'Mewtwo', age: 2 },
        { id: 'cdfvgb', name: 'Gallade', age: 3 },
      ],
      otherState: 'Lol xD',
      buttonState: false,
    };
  }

  // Handler Method
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => p.id === id);
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons,
    });
  };

  // Handler Method
  deleteButtonHandler = (personIndex) => {
    // Ass a good prcatie we must always update the arryain immute manner i.e without changing inital state
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  // Handler Method
  showHideButtonHandler = (event) => {
    this.setState({
      buttonState: !this.state.buttonState,
    });
  };

  render() {
    let personView = null;
    if (this.state.buttonState) {
      personView = (
        <Persons
          persons={this.state.persons}
          change={this.nameChangeHandler}
          deleteButton={this.deleteButtonHandler}
        />
      );
    } else personView = null;

    return (
      <div className={classes.App}>
        <Cockpit
          persons={this.state.persons}
          buttonState={this.state.buttonState}
          button={this.showHideButtonHandler}
        />
        {personView}
      </div>
    );
  }
}

export default App;
