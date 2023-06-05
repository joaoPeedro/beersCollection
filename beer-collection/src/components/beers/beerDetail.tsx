import Image from "next/image";
import styles from "./styles/beerDetail.module.scss";
import FavoriteBeer from "./favoriteBeer";

type BeerDetailProps = {
  beer: beer;
};

export default function BeerDetail({ beer }: BeerDetailProps) {
  return (
    <>
      <h1 className="heading-1">{beer.name}</h1>
      <p className="heading-4">{beer.tagline}</p>
      <div className={styles.wrapDescription}>
        <picture className={styles.imgWrp}>
          <Image
            src={beer.image_url}
            alt={beer.name}
            width="500"
            height="500"
            style={{ width: "fit-content", maxHeight: "320px" }}
          />
        </picture>
        <div>
          <FavoriteBeer beer={beer} />
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
