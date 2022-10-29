import React from 'react';
import './styles.scss';

const PolicyCard = (props) => {
  return (
    <div className="policy-card">
      <div className="policy-card__icon">{<props.icon className="icon-card" size="40" />}</div>
      <div className="policy-card__info">
        <div className="policy-card__info__name">{props.name}</div>
        <div className="policy-card__info__description">{props.description}</div>
      </div>
    </div>
  );
};

export default PolicyCard;
