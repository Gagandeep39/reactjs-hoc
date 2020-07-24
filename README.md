# Concepts used in this demo

- [Concepts used in this demo](#concepts-used-in-this-demo)
  - [Higher Order Component](#higher-order-component)
    - [Aux](#aux)
    - [With Class](#with-class)
    - [With Class - Method 2](#with-class---method-2)
  - [Using setState()](#using-setstate)
  - [Correct way of using Set State](#correct-way-of-using-set-state)
  - [propTypes](#proptypes)
  - [Setting up Reference](#setting-up-reference)
    - [`ref` keyword](#ref-keyword)
    - [Using constructor (Requires React 16.3 +)](#using-constructor-requires-react-163-)
    - [Reference in functiojnal component - React Hooks](#reference-in-functiojnal-component---react-hooks)
  - [Context API](#context-api)
    - [`AuthContext`](#authcontext)
    - [`contextType`  (React 16.6 +)](#contexttype-react-166-)
    - [`useContext`](#usecontext)

## Higher Order Component
- Wraps another Component
- Doesn't add any Logic
- Naming Convection 
  - Add a suffix `With` to the name
  - Name must start with Caps
### Aux
- Simply wraps a component
- Returns all the child component
- Snippet
  ```js
  // Auxiliary.js
  const Auxiliary = (props) => props.children;
  export default Auxiliary;
  // Component class
  return (
    <Auxiliary>
      <p>Element 1</p>
      <p>Element 2</p>
      <p>Elemenet 3</p>
    </Auxiliary>
  );
  ```

### With Class
- Basic HOC that also allows adding Css to root Component
- Better than previous
- Snippet
  ```js
  // WithClass.js
  import React from 'react'
  const WithClass = (props) => (
    <div className={props.classes}> { props.children } </div>
  )
  export default WithClass;
  // Component class
  return (
    <WithClass classes={classes}>
      <p>Element 1</p>
      <p>Element 2</p>
      <p>Elemenet 3</p>
    </WithClass>
  );

  ```

### With Class - Method 2
- Usually used in analytics
- USed when presentation is not Priority
- Combination of Aux ad With Class
- Snippet - Auxiliary Class
  ```js
  // Auxiliary.js
  const Auxiliary = (props) => props.children
  export default Auxiliary;
  ```
- Snippet - WithClass
  ```js
  //WithClass.js
  import React from 'react';
  const withClassTwo = (WrappedComponent, className) => {
    return props => (
      <div className={className}>
        <WrappedComponent {...props}/>
      </div>
    );
  };
  export default withClass;
  ```
- Snippet - Actual Use Case
  ```js
  // Person.js
  import Auxiliary from '../../../hoc/Auxiliary';
  import withClassTwo from '../../../hoc/withClassTwo';
  <Auxiliary>
    <p>Element 2</p>
    <p>Elemenet 3</p>
  </Auxiliary>
  export default withClassTwo(Person, classes.Person);
  ```
  - Here is Props are passed from COmponent to HOC via export statement

## Using setState()
- Used in classes
- INitial state is set using `state = {data='Initial'}`
- Usually this is performed in constructor
- To change the state we use
  ```js
  // New state
  this.setState({
    data: 'Updated'
  });
  ```

## Correct way of using Set State
- Usually we perm it traditionally
```js
this.setState({
  // Execute the code
});
```
- However this sometimes lead of unexpected behavious
- When we change state based on rendering bahiour (eg. Count number of button pressed in a list), It can give wrong results
- Abnormal results are seen when we call `setState` in multiple places
- To fix this below method ust be used
```js
this.setState((prevState, props) => {
  return {
    // Perform actual operation
  };
})
```
- Here we are ensuring that the changes are only made to previous state of the data

## propTypes
- Improve code quality
- To prevent wrong usage of props
- Requires package `prop-types`
- Restrict additon of wrong data to props
- Snippet
  ```js
  import PropTypes from 'prop-types';
  // Applying to a component
  class Person extends Component {}
  Person.propTypes = {
    click: PropTypes.func, // Pointer to a function
    name: PropTypes.string,
    age: PropTypes.number,
    change: PropTypes.func
  };
  export default Person
  ```
- Here we ar specifiying the data type of Props that Person component can take
- Wrong prop name or wrong value of prop will cause a warning
- Consider a wrong example Below
  ```js
  <Person
          key='scdfvg'
          change={(event) => this.props.change(event, person.id)}
          name=12
          age=12
          deleteButton={() => this.props.deleteButton(index)}
        />
  ```
- Here the code will give error as `name` cannot be given number input

## Setting up Reference

### `ref` keyword
- SImilar to query selector
- Uses an inbuilt prop called `ref`
- Can only be used on class component
- Add `ref={(inputElement) => {this.inputRef = inputElement}}` to the element
- `this.inputRef` can then be used anywhere in class to perform operation

### Using constructor (Requires React 16.3 +)
- Add `ref={this.inputRef}` to the element
- Initialize it in constructor as `this.inputRef = React.createRef()`
- `this.inputRef.current` can then be used to perform any operation

### Reference in functiojnal component - React Hooks
- We use `useRef` for selecting a DOM element
- Snippet
  ```js
  import { useRef } from 'react';
  // Executing operation using reference
  const FunctionalComponentName = (props) => {
    useEffect(
    () => {
      buttonRef.current.click();
    },[]);
  }

  // Assigning refeerce
  return (<button ref={buttonRef}></button>  )
  ```
- We have to add the reference inside `useEffect` as we cannot run it at the beginning
- `useEffect` is a Rect lifecycle hook and hence allows operation to be executed after component loads
- `[]` Implies useEffect will run only once after component loads

## Context API

### `AuthContext`
- To prevent sharing data by passing them one after another
- Directly shares data from one component to another (No relation required)
- Everything thhat must be provided by Context must be wrapped with Context component
- Provide Context or the info that must be shared among component is enclosed in `<AuthContext.Provider></AuthContext.Provider>`
- Consume Context or the component that will access this data wil be enclosed in `<AuthContext.Consumer></AuthContext.Consumer>`
- Consumer must enclose a function
- Example
  - Create Context Component
    ```js
    import React from 'react';

    const AuthContext = React.createContext({
      authenticated: false,
      login: () => {},
    });

    export default AuthContext;
    ```
  - Add a provider
    ```js
    // Handler logic
    authenticationHandler = () => {this.setState({ authenticated: true });};

    //Actual provider inside render method
    <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.authenticationHandler}}>
      <Cockpit />
    </AuthContext.Provider>
    ```
  - Consumer 1 - Simply read the value provided by Context API
    ```js
    <AuthContext.Consumer>
    {(context) => context.authenticated ? <p>Authenticated</p> : <p>Please Login</p>}
    </AuthContext.Consumer>
    ```
  - Consumer 2 - Modify COntext value
    ```js
    <AuthContext.Consumer>
      {(context) => <button onClick={context.login}>Login Button</button>}
    </AuthContext.Consumer>
    ```
- Drawbacks
  - Provider and COnsumer are only supported in `render()`

### `contextType`  (React 16.6 +)
- Access context inside **class component**
- Create a `AuthContext` component like previous method
- Create a static method `contextType`
- Snippet
  ```js
  import AuthContext from '../context/auth-context';
  // Initialize it anywhere in class (outside a mtethod)
  static contextType = AuthContext;
  // Access the context in any lifecycle method
  console.log(this.context.XX);
  ```
- Make a note that initilaization requies `contextType` and accessing it requires `context`

### `useContext`
- Access context in **functional component**
- Snippet
  ```js
  import { useContext } from 'react'
  import AuthContext from '../context/auth-context';

  const FunctionalConponent = (props) => {
    // initialization
    const authContext = useContext(AuthContext);

    // Access value
    console.log(authContext.XX)
  }
  ```