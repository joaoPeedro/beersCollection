import BeersList from "@/components/beers/beersList";
import { getJsonData } from "@/utils";
import React from "react";

export default async function Beers() {
  const data = await getJsonData<Beer[]>({
    endPoint: `${process.env.BEERS_GATEWAY}?per_page=80`,
  });

  return (
    <>
      <main>
        <h1 className="heading-1">Beers Collection</h1>
        <h2 className="heading-3 accent-color italic">
          Millions of Beers to discover and taste.
        </h2>
        <BeersList beers={data} />
      </main>
    </>
  );
}
