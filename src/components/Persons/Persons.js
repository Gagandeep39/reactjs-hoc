import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
  // 1. Component Update Lifecycle - WIll Execut every time
  static getDerivedStateFromProps(props, state) {
    console.log('[Persons.js] getDerivedStateFromProps');
    return state;
  }

  // 2. Component Update Lifecycle -
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.persons === this.props.persons) {
      // No need to executet futher if there is no change
      // Make sure how its being used, as array uses pointer and hence if will be different only when array occupies a new location in memory
      return false;
    }
    console.log('[Persons.js] shouldComponentUpdate');
    return true;
  }

  // 4. Component Update Lifecycle - Will execute only when updation of componenet takes place
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnashotBeforeUpdate');
    // Below message is the snapshot
    return {mesage: 'Returned from getSnapshotBeforeUpdate'};
  }

  // 5. Component Update Lifecycle - Will execute only when component is updated (i.e not during initial creation)
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    // Snapshot contaisn the value returned in 'getSnapshotBeforeUpdate' method
    console.log(snapshot);
  }

  //Normally used for cleanup
  componentWillUnmount(){
    console.log('[Persons.js] Used for Clean Up');
  }

  // 3. Component Update Lifecycle - Remdering of UI, CHildren Component
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
          isAuth={this.props.isAuthenticated}
        />
      );
    });
  }
}

export default Persons;
