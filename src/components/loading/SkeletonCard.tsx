// src/components/SkeletonCard.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SkeletonCard.module.scss";

const SkeletonCard = () => {
  return (
    <article className={styles.card}>
      <div className={styles.title}>
        <Skeleton height={30} width={`60%`} />
      </div>

      <p className={styles.date}>
        <Skeleton height={20} width={`40%`} />
      </p>

      <div className={styles.shipInfo}>
        <Skeleton circle height={40} width={40} />
        <div style={{ marginLeft: "1rem" }}>
          <Skeleton width={100} />
          <Skeleton width={80} />
        </div>
      </div>

      <div className={styles.people}>
        <Skeleton width={150} />
        <Skeleton width={150} />
        <Skeleton width={150} />
      </div>

      <Skeleton height={36} width={`100%`} />
    </article>
  );
};

export default SkeletonCard;
