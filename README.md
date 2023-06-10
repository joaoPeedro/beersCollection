This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

# Beer Collection

This is a beer collection project developed with Next.js and TypeScript.

## Environment Variables

- `ORIGIN_URL` :localhost:3000
- `BEERS_GATEWAY`:https://api.punkapi.com/v2/beers
- `COMMENTS_MOCK_API_GATEWAY` :https://63500053df22c2af7b605558.mockapi.io/beers
- `COMMENTS_MOCK_API_KEY` :FakeKey
- `COMMENTS_GATEWAY`:/api/comments

## Routes

### Home

Basic HomePage:

### Beers

In this path, you can explore all of beers.

### Favorite Beers

The user can access their list of favorite beers via this path. The beer IDs are saved in localStorage, and when the user visits this page, all of his favorite beers are loaded.

### Beer detail

In this path, the user can get access to all the beer info.

- to mark this beer as a favorite:
  the Id of the beer is stored in the localStorage and appears a start near the picture
- Comments
  The comments are storage in a MockApi.
  To use this, MockApi I created a NextJs route API that allows the hide the secret key
  Also to prevent abusive requests and protect this API was created a RateLimiter and a middleware

### SearchBeers

On this path, the user can search for beers.

- Query Search
  The query search will be updated when the user changes the search params, this allows the user to save his search on favorite bar or share his search with other users
