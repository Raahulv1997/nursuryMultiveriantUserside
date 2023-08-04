import React from 'react';
import { Link } from 'react-router-dom';
function ProductRating({ rating}) {
  const stars = [];

  // Create an array of stars based on the rating
  for (let i = 0; i < 5; i++) {
    const starClass = i < rating ? 'active icofont-star' : 'icofont-star';
    stars.push(<i key={i} className={starClass}></i>);
  }

  return (
    <div className="product-rating">
      {stars}
      <Link to="">({rating})</Link>
    </div>
  );
}

export default ProductRating;
