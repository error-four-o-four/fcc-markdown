import styles from './Card.module.css';

function Card({ title, descr, src = '' }) {
  return (
    <div className={styles.card} title={title}>
      <div className={styles.cardThumb}>
        <img src={src} alt={`Thumbnail of ${title}`} />
      </div>
      <div className={styles.cardContent}>
        <h1>{title}</h1>
        <p>{descr}</p>
      </div>
    </div>
  );
}

export default Card;
