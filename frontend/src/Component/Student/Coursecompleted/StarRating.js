import React from 'react';
import './StarRating.css'; // Import your CSS file for styling

const StarRating = ({ rating }) => {
  // rating is expected to be a number from 0 to 5
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const fill = index < rating ? 'filled' : 'unfilled';
        return (
          <span key={index} className={`star ${fill}`}>&#9733;</span>
        );
      })}
    </div>
  );
};

export default StarRating;
