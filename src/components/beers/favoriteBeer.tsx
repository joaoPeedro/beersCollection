"use client";

import { ChangeEvent, useEffect, useState } from "react";
import styles from "./styles/favoriteBeer.module.scss";
import { addFavoriteBeer, removeFavoriteBeer } from "../../utils";

type FavoriteBeerProps = {
  beer: Beer;
};

export default function FavoriteBeer({ beer }: FavoriteBeerProps) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(isFavoriteBeer(beer.id));
  }, []);

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addFavoriteBeer(beer.id);
      setIsChecked(true);
    } else {
      removeFavoriteBeer(beer.id);
      setIsChecked(false);
    }
  };
  return (
    <label className={styles.containerFavorite}>
      <input type="checkbox" checked={isChecked} onChange={handleClick} />
      {isChecked ? (
        <span className="heading-3">⭐</span>
      ) : (
        <span className="heading-3">🔳</span>
      )}
    </label>
  );
}
function isFavoriteBeer(id: number): import("react").SetStateAction<boolean> {
  throw new Error("Function not implemented.");
}
