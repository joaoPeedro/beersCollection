"use client";

const FAVORITE_BEERS = "favoriteBeers";

export function getFavoriteBeers(): number[] {
  const localData = localStorage.getItem(FAVORITE_BEERS);
  return localData ? JSON.parse(localData) : [];
}

export function isFavoriteBeer(id: number) {
  const localData = localStorage.getItem(FAVORITE_BEERS);
  const favoriteBeers = localData ? JSON.parse(localData) : [];
  return favoriteBeers.indexOf(id) === -1 ? false : true;
}

export function addFavoriteBeer(id: number) {
  const localData = localStorage.getItem(FAVORITE_BEERS);
  const favoriteBeers = localData ? JSON.parse(localData) : [];
  favoriteBeers.push(id);
  localStorage.setItem(FAVORITE_BEERS, JSON.stringify(favoriteBeers));
}

export function removeFavoriteBeer(id: number) {
  const localData = localStorage.getItem(FAVORITE_BEERS);
  const favoriteBeers = localData ? JSON.parse(localData) : [];
  favoriteBeers.splice(favoriteBeers.indexOf(id), 1);

  localStorage.setItem(FAVORITE_BEERS, JSON.stringify(favoriteBeers));
}
