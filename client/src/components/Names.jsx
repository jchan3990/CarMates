import React from 'react';

import Name from './Name.jsx';

const Names = ({ names }) => {
  return (
    <div>
      {names && names.map((name, idx) => (
        <Name key={idx} name={name.username} />
      ))}
    </div>
  )
}

export default Names;