import React from 'react';

export const Button = ({ onClick }) => {
  return (
    <div className="ButtonContainer">
      <button type="button" className="Button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
