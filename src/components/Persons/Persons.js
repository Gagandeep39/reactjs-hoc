import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
  render() {
    console.log('[Persons.js] Rendering');
    return this.props.persons.map((person, index) => {
      return (
        <Person
          key={person.id}
          change={(event) => this.props.change(event, person.id)}
          name={person.name}
          age={person.age}
          deleteButton={() => this.props.deleteButton(index)}
        />
      );
    });
  }
}

export default Persons;
