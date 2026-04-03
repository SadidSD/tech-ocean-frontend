// --- Star Rating Component ---

const StarRating = ({ rating = 0, count = 0 }) => {
    // Round rating to nearest half to handle half stars (e.g., 4.5)
    const normalizedRating = Math.round(rating * 2) / 2;
    
    return (
        <div className="star-rating">
            <div className="stars">
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    
                    if (normalizedRating >= starValue) {
                        return <i key={index} className="fas fa-star filled"></i>;
                    } else if (normalizedRating === starValue - 0.5) {
                        return <i key={index} className="fas fa-star-half-alt filled"></i>;
                    } else {
                        return <i key={index} className="far fa-star"></i>;
                    }
                })}
            </div>
            {count > 0 && <span className="review-count">({count})</span>}
        </div>
    );
};
