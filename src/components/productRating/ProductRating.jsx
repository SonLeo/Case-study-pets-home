import styles from "./ProductRating.module.css";

const ProductRating = ({ product = { rate: { value: 0 } } }) => {
    const fullStars = Math.floor(product.rating.value);
    const restStarPercentage = (product.rating.value - fullStars) * 100;

    return (
        <div className={styles["product-rating"]}>
            {/* Render filled stars */}
            {[...Array(fullStars)].map((_, index) => (
                <div key={index} className={styles["star-wrapper"]}>
                    <div className={styles["stars__lit"]} style={{ width: "100%" }}>
                        <img className={`${styles["star"]} ${styles["star--yellow"]}`} src="/assets/icons/Star-solid-gold.svg" alt="Filled star" />
                    </div>
                    <img className={`${styles["star"]} ${styles["star--hollow"]}`} src="/assets/icons/Star-line.svg" alt="Empty star" />
                </div>
            ))}

            {/* Render partial star if needed */}
            {restStarPercentage > 0 &&
                <div className={styles["star-wrapper"]}>
                    <div className={styles["stars__lit"]} style={{ width: `${restStarPercentage}%` }}>
                        <img className={`${styles["star"]} ${styles["star--yellow"]}`} src="/assets/icons/Star-solid-gold.svg" alt="Partial star" />
                    </div>
                    <img className={`${styles["star"]} ${styles["star--hollow"]}`} src="/assets/icons/Star-line.svg" alt="Empty star" />
                </div>
            }

            {/* Render remaining empty stars */}
            {[...Array(5 - fullStars - (restStarPercentage > 0 ? 1 : 0))].map((_, index) => (
                <div key={index + fullStars} className={styles["star-wrapper"]}>
                    <div className={styles["stars__lit"]} style={{ width: "0%" }}>
                        <img className={`${styles["star"]} ${styles["star--yellow"]}`} src="/assets/icons/Star-solid-gold.svg" alt="Empty filled star" />
                    </div>
                    <img className={`${styles["star"]} ${styles["star--hollow"]}`} src="/assets/icons/Star-line.svg" alt="Empty star" />
                </div>
            ))}
        </div>
    );
}

export default ProductRating;
