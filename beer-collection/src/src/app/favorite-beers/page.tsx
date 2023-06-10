"use client";

import BeersList from "@/components/beers/beersList";
import { getFavoriteBeers, getJsonData } from "@/utils";
import { useEffect, useState } from "react";

export default function FavoriteBeers() {
  const [beers, setBeers] = useState<Beer[]>();

  useEffect(() => {
    const ids = getFavoriteBeers().join("|");
    getJsonData<Beer[]>({
      endPoint: `${process.env.BEERS_GATEWAY}?ids=${ids}`,
    }).then((response) => {
      if (response) setBeers(response);
    });
  }, []);

  return (
    <main>
      <h1 className="heading-1">Favorite Beers</h1>
      <h2 className="heading-3 accent-color italic">
        Millions of Beers to discover and taste.
      </h2>
      {beers &&
        (beers.length > 0 ? (
          <>
            <BeersList beers={beers} />
          </>
        ) : (
          <>
            <br />
            <h3>You only like water 😒</h3>
          </>
        ))}
    </main>
  );
}
