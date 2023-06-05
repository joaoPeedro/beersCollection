"use client";

import BeersList from "@/components/beers/beersList";
import { getFavoriteBeers, getJsonData } from "@/utils";
import { useEffect, useState } from "react";

export default function FavoriteBeers() {
  const [beers, setBeers] = useState<beer[]>();

  useEffect(() => {
    const ids = getFavoriteBeers().join("|");
    getJsonData<beer[]>({
      endPoint: `${process.env.BEERS_GATEWAY}?ids=${ids}`,
    }).then((response) => {
      if (response) setBeers(response);
    });
  }, []);

  return (
    <>
      <main>
        {beers && beers.length && (
          <>
            <h1 className="heading-1">Favorite Beers</h1>
            <h2 className="heading-4">
              Millions of Beers to discover and taste.
            </h2>
            <BeersList beers={beers} />
          </>
        )}
      </main>
    </>
  );
}
