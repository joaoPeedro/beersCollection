"use client";

import { addFavoriteBeer, isFavoriteBeer, removeFavoriteBeer } from "@/utils";
import { ChangeEvent, useEffect, useState } from "react";

type FavoriteBeerProps = {
  beer: beer;
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
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleClick} />
      <span className="slider"></span>
    </label>
  );
}
