import Image from "next/image";
import styles from "./styles/beersList.module.scss";
import Link from "next/link";

type BeersListProps = {
  beers?: beer[];
};

export default function BeersList({ beers }: BeersListProps) {
  return (
    <section>
      <ul className={styles.container}>
        {beers?.map((beer, idx) => (
          <li key={`beer-${idx}`}>
            <h3 className="heading-4 sub-title">{beer.name}</h3>
            <p className={styles.description}>{beer.description}</p>
            <Link href={`/beers/${beer.id}`}>
              <picture className={`shadow-1 ${styles.imgWrp}`}>
                <Image
                  src={beer.image_url}
                  alt={beer.name}
                  width="500"
                  height="500"
                  style={{ width: "fit-content", maxHeight: "320px" }}
                />
              </picture>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
