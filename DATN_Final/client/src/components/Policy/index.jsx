import React from 'react';
import PolicyCard from '../PolicyCard';
import policy from './data';

const Policy = () => {
  return (
    <div className="container policy">
      <div className="row my-3">
        {policy.map((item, idx) => (
          <div className="col-md-3" key={idx}>
            <PolicyCard name={item.name} description={item.description} icon={item.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policy;
