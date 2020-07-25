import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
// import WithClass from '../hoc/WithClass'
import withClassTwo from '../hoc/withClassTwo';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';
import ErrorBoundary from '../hoc/ErrorBoundary';

class App extends Component {
  // 1. Compnent Creation Life Cycle Step
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
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
      authenticated: false,
    };
  }

  // 2. Compnent Creation Life Cycle Step
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentWillMount() {
    console.log('[App.js] componentWillMount');
  }

  // 5. Compnent Creation Life Cycle Step
  componentDidMount() {
    console.log('[App.js] componentDidMount');
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

  authenticationHandler = () => {
    this.setState({ authenticated: true });
  };

  // 1. Component State Update Lifecycle
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  // 2. Component State Update Lifecycle
  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  // May not work while testing
  handleError() {
    throw new Error('Lol, Testning Error Boundary')
  }

  // 3. Compnent Creation Life Cycle Step
  render() {
    console.log('[App.js] Render');
    let personView = null;
    if (this.state.buttonState) {
      personView = (
        // 4. Compnent Creation Life Cycle Step - Life Cycle of Child Component
        <Persons
          persons={this.state.persons}
          change={this.nameChangeHandler}
          deleteButton={this.deleteButtonHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    } else personView = null;

    return (
      // <div className={classes.App}>
      //   {/* 4. Compnent Creation Life Cycle Step - Life Cycle of Child Component */}
      //   <Cockpit
      //     persons={this.state.persons}
      //     buttonState={this.state.buttonState}
      //     button={this.showHideButtonHandler}
      //   />
      //   {personView}
      // </div>

      // Method 2 - Best
      // <WithClass classes={classes}>
      //   {/* 4. Compnent Creation Life Cycle Step - Life Cycle of Child Component */}
      //   <Cockpit
      //     persons={this.state.persons}
      //     buttonState={this.state.buttonState}
      //     button={this.showHideButtonHandler}
      //   />
      //   {personView}
      // </WithClass>

      // Method 3
      // Must beuse when Logic is important compared to UI
      <ErrorBoundary ket="12w34">
        <Auxiliary>
        {/* 4. Compnent Creation Life Cycle Step - Life Cycle of Child Component */}
        {/* Here cockpit uses authentication data (To login/lout) and personView uses authentication data  */}
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.authenticationHandler}}>
          <Cockpit
            persons={this.state.persons}
            buttonState={this.state.buttonState}
            button={this.showHideButtonHandler}
          />
          {personView}
        </AuthContext.Provider>
        <button onClick={this.handleError}>Test Error Boundary</button>
      </Auxiliary>
      </ErrorBoundary>
    );
  }
}

export default withClassTwo(App, classes.App);

// Life Cycle Flow
// [App.js] constructor
// App.js:28 [App.js] getDerivedStateFromProps {}
// App.js:82 [App.js] Render
// App.js:38 [App.js] componentDidMount
// App.js:28 [App.js] getDerivedStateFromProps {}
// App.js:71 [App.js] shouldComponentUpdate
// App.js:82 [App.js] Render
// Persons.js:7 [Persons.js] getDerivedStateFromProps
// Persons.js:33 [Persons.js] Rendering
// Person.js:6 [Person.js] Rendering
// App.js:77 [App.js] componentDidUpdate
