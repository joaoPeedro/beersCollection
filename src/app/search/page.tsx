"use client";
import BeersList from "@/components/beers/beersList";
import { APP_ROUTES } from "@/constants/appRoutes";
import { createQueryString, getJsonData } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState, MouseEvent } from "react";

enum Key {
  Term = "term",
  SortTerm = "sortTerm",
  SortAscending = "ascending",
}

enum SortTerm {
  Name = "name",
  Type = "yeast",
}

type sortBeersProps = {
  beers: Beer[];
  sortTerm: SortTerm;
  ascending: boolean;
};

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [beers, setBeers] = useState<Beer[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({
    [Key.SortTerm]: SortTerm.Type,
    [Key.SortAscending]: true,
  });

  useEffect(() => {
    const term = searchParams.get(Key.Term);
    const qSortTerm = searchParams.get(Key.SortTerm) as SortTerm;
    const qSortAscending = "true" === searchParams.get(Key.SortAscending);

    if (term && qSortTerm) {
      setSearchTerm(term);
      setSort({
        [Key.SortTerm]: qSortTerm,
        [Key.SortAscending]: qSortAscending,
      });
      getBeers(term).then((beers) => {
        if (beers)
          sortBeers({
            beers,
            sortTerm: qSortTerm,
            ascending: qSortAscending,
          });
      });
    }
  }, []);

  function sortBeers({ beers, sortTerm, ascending }: sortBeersProps) {
    const beersToReturn = beers.slice();

    try {
      if (ascending) {
        beersToReturn.sort((a, b) =>
          sortTerm === SortTerm.Type
            ? a.ingredients[sortTerm].localeCompare(b.ingredients[sortTerm])
            : a[sortTerm].localeCompare(b[sortTerm])
        );
        setBeers(beersToReturn);

        return;
      } else {
        beersToReturn.sort((a, b) =>
          sortTerm === SortTerm.Type
            ? b.ingredients[sortTerm].localeCompare(a.ingredients[sortTerm])
            : b[sortTerm].localeCompare(a[sortTerm])
        );
        setBeers(beersToReturn);
        return;
      }
    } catch {
      console.log("The query is not valid.");
      setBeers(beers);
    }
  }

  function getBeers(term: string) {
    return getJsonData<Beer[]>({
      endPoint: `${process.env.BEERS_GATEWAY}?beer_name=${term}`,
    });
  }

  function handleTermChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSortChange(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const newSortDirection =
      e.currentTarget.value !== sort.sortTerm ? true : !sort.ascending;
    beers &&
      sortBeers({
        beers,
        sortTerm: e.currentTarget.value as SortTerm,
        ascending: newSortDirection,
      });

    setSort({
      [Key.SortTerm]: e.currentTarget.value as SortTerm,
      [Key.SortAscending]: newSortDirection,
    });

    router.push(
      `${APP_ROUTES.search.path}?${createQueryString(
        [
          { key: Key.Term, value: searchTerm },
          { key: Key.SortTerm, value: e.currentTarget.value },
          { key: Key.SortAscending, value: `${newSortDirection}` },
        ],
        searchParams
      )}`
    );
  }

  function handleTermSubmitted(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getBeers(searchTerm).then((beers) => {
      if (beers)
        sortBeers({
          beers,
          sortTerm: sort.sortTerm,
          ascending: sort.ascending,
        });
    });

    router.push(
      `${APP_ROUTES.search.path}?${createQueryString(
        [
          { key: Key.Term, value: searchTerm },
          { key: Key.SortTerm, value: sort.sortTerm },
          { key: Key.SortAscending, value: `${sort.ascending}` },
        ],
        searchParams
      )}`
    );
  }

  return (
    <main>
      <div>
        <span>
          <h1 className="heading-1">Find you beer</h1>
          <form onSubmit={handleTermSubmitted}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleTermChange}
              required
              placeholder="name"
            />
            <button>🍺</button>
          </form>
        </span>
        <h3 className="heading-5">Order by:</h3>
        <ul>
          <li>
            <button
              className="heading-5"
              value={SortTerm.Name}
              onClick={handleSortChange}
            >
              Name
              <span>
                {sort.sortTerm === SortTerm.Name &&
                  (sort.ascending ? "▲" : "▼")}
              </span>
            </button>
          </li>
          <li>
            <button
              className="heading-5"
              value={SortTerm.Type}
              onClick={handleSortChange}
            >
              Yeast
              <span>
                {sort.sortTerm === SortTerm.Type &&
                  (sort.ascending ? "▲" : "▼")}
              </span>
            </button>
          </li>
        </ul>
      </div>
      {beers &&
        (beers.length > 0 ? (
          <>
            <BeersList beers={beers} />
          </>
        ) : (
          <>
            <br />
            <h3>I don&apos;t think that beer is drinkable. 🤢</h3>
          </>
        ))}
    </main>
  );
}
