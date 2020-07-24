import React from 'react';
import Person from './Person/Person';

const persons = (props) => {
  console.log('[Persons.js] Rendering');
  return props.persons.map((person, index) => {
    return (
      <Person
        key={person.id}
        change={(event) => props.change(event, person.id)}
        name={person.name}
        age={person.age}
        deleteButton={() => props.deleteButton(index)}
      />
    );
  });
};

export default persons;
