import BeerDetail from "@/components/beers/beerDetail";
import Comments from "@/components/beers/comments";
import { getJsonData } from "@/utils";
import { Metadata } from "next";

type BeerProps = {
  params: {
    beerId: string;
  };
};

export const dynamicParams = true;
export const revalidate = 60 * 60;

export async function generateStaticParams() {
  const beers = await getJsonData<Beer[]>({
    endPoint: `${process.env.BEERS_GATEWAY}?per_page=80`,
  });

  return beers
    ? beers.map((beer) => ({
        beerId: `${beer.id}`,
      }))
    : [{ beerId: "323" }, { beerId: "2" }, { beerId: "3" }];
}

export async function generateMetadata({
  params,
}: BeerProps): Promise<Metadata> {
  const { beerId } = params;
  const beer = await getJsonData<Beer[]>({
    endPoint: `${process.env.BEERS_GATEWAY}/${beerId}`,
  });

  if (!beer)
    return {
      title: "Beer Not Found",
    };

  return {
    title: beer[0].name,
    description: beer[0].description,
  };
}

export default async function Beer({ params }: BeerProps) {
  const { beerId } = params;
  const beer = await getJsonData<Beer[]>({
    endPoint: `${process.env.BEERS_GATEWAY}/${beerId}`,
  });

  return (
    <main>
      {beer && (
        <>
          <BeerDetail beer={beer[0]} />
          <Comments beerId={beer[0].id} />
        </>
      )}
    </main>
  );
}
