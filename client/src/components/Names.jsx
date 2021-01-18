import React from 'react';

import Name from './Name.jsx';

const Names = ({ names }) => {
  return (
    <div id='names-container'>
      <ul id='names-list'>
        {names && names.map((name, idx) => (
          <Name key={idx} name={name.username} />
        ))}
      </ul>
    </div>
  )
}

export default Names;