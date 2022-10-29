import { Avatar, Rate } from 'antd';
import React from 'react';
import './styles.scss';

const Review = ({ review }) => {
  return (
    <div className="review d-flex">
      <div className="review-avatar me-2">
        <Avatar />
      </div>
      <div className="review-content">
        <div className="review-content-name">{review.name}</div>
        <Rate
          style={{ fontSize: '12px' }}
          className="review-content-rate"
          disabled
          defaultValue={review.rating}
        />
        <div className="review-content-comment">{review.comment}</div>
      </div>
    </div>
  );
};

export default Review;
