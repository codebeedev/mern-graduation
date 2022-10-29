import { Avatar, Button, Input, message, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newReview } from '../../redux/actions/productAction';
import { NEW_REVIEW_RESET } from '../../redux/types/productTypes';

const ReviewPost = ({ id }) => {
  const dispatch = useDispatch();
  const { success, error: reviewError, loading } = useSelector((state) => state.newReview);

  const [rating, setRating] = useState();
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (reviewError) {
      message.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      message.success('Đánh giá thành công!');
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [success, reviewError, dispatch]);

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', id);

    dispatch(newReview(myForm));

    setComment('');
    setRating(0);
    window.location.reload();
  };
  return (
    <div className="review-post d-flex">
      <div className="review-post-avatar me-2">
        <Avatar size="large" />
      </div>
      <div className="review-post-content" style={{ width: '100%' }}>
        <Rate onChange={setRating} value={rating} />
        <Input.TextArea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          rows={4}
          style={{ width: '100%' }}
        />
        <Button
          loading={loading}
          htmlType="submit"
          type="primary"
          className="mt-3"
          onClick={reviewSubmitHandler}
        >
          Thêm đánh giá
        </Button>
      </div>
    </div>
  );
};

export default ReviewPost;
