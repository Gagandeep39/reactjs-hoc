import React from 'react'

const WithClass = (props) => (
  // Round bract implies there is only 1 line and a return keyword is implied
  <div className={props.classes}> { props.children } </div>
)

export default WithClass;
