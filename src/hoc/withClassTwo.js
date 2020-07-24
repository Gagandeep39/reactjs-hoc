import React from 'react';
// Another way of Creating Higher order componenet
// Here we create a funtioon that eturns a functional component
// Here wrapped Component is a reference to other component
// className is sued for providing 
// To use this, we also need Aux
// Must beuse when Logic is important compared to UI
const withClassTwo = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent />
    </div>
  );
}

export default withClassTwo;