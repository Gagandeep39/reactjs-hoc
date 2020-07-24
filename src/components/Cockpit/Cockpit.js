import React, { useEffect, memo, useRef } from 'react';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
  const buttonRef = useRef(null);
  let assignedClasses = [];
  let btnClass = [classes.Button];

  if (props.buttonState) {
    btnClass.push(classes.Red);
  }

  if (props.persons.length <= 2)
    assignedClasses = [classes.red, classes.bold].join(' ');

  // By default it executes all the time, to prevent this we have t specify when to use
  useEffect(
    () => {
      console.log('[Cockpit.js] UseEffect');
      buttonRef.current.click();
      return () => {
        console.log('Clean Up Work in use Effect');
      }
    },
    // Allows specifuying when it will be eecuted, eg. hre it will execute when person changes
    // [props.person]
    // To execute it only once or the first time, we pass and empty array
    []
  );

  // return (
  //   <div>
  //     <p className={assignedClasses}>Delete Elements tp chnge Css styling</p>
  //     <button className={btnClass.join(' ')} onClick={props.button}>
  //       Show/Hide Persons
  //     </button>
  //   </div>
  // );

  return [
      <p key="i1" className={assignedClasses}>Delete Elements tp chnge Css styling</p>,
      <button key="i2" ref={buttonRef} className={btnClass.join(' ')} onClick={props.button}>
        Show/Hide Persons
      </button>,
      <AuthContext.Consumer>
        {(context) => <button onClick={context.login}>Login Button</button>}
      </AuthContext.Consumer>
      
  ];
};

// Memo Allowsreact to memorize the components and precvents rendering if there is no change
export default React.memo(Cockpit);
