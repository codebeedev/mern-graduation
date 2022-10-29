import React from 'react';
import './styles.scss';

const Title = ({ title }) => {
  return (
    <div className="title-header text-center">
      <h6>{title}</h6>
    </div>
  );
};

export default Title;
