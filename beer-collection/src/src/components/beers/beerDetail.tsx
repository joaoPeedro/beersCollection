import Image from "next/image";
import styles from "./styles/beerDetail.module.scss";
import FavoriteBeer from "./favoriteBeer";

type BeerDetailProps = {
  beer: Beer;
};

export default function BeerDetail({ beer }: BeerDetailProps) {
  return (
    <>
      <h1 className="heading-1">{beer.name}</h1>
      <p className="heading-4 accent-color italic">{beer.tagline}</p>
      <div className={styles.containerDescription}>
        <picture className={`shadow-1 ${styles.imgWrp}`}>
          <FavoriteBeer beer={beer} />
          <Image
            src={beer.image_url || "https://images.punkapi.com/v2/196.png"}
            alt={beer.name}
            width="500"
            height="500"
            style={{ width: "fit-content" }}
          />
        </picture>
        <div className={styles.description}>
          <h2 className="heading-4">Beer type</h2>
          <p>{beer.ingredients.yeast}</p>
          <p>{beer.description}</p>
          <h2 className="heading-4">Food Pairing</h2>
          <ul>
            {beer.food_pairing.map((food, idx) => (
              <li key={`food_pairing-${idx}`}>{food}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
