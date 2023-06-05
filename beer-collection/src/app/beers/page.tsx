import BeersList from "@/components/beers/beersList";
import { getJsonData } from "@/utils";
import React from "react";

export default async function Beers() {
  const data = await getJsonData<beer[]>({
    endPoint: `${process.env.BEERS_GATEWAY}`,
  });

  return (
    <>
      <main>
        <h1 className="heading-1">Beers Collection</h1>
        <h2 className="heading-4">Millions of Beers to discover and taste.</h2>
        <BeersList beers={data} />
      </main>
    </>
  );
}
