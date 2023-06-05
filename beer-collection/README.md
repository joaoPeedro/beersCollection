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

- `BEERS_GATEWAY`: "https://api.punkapi.com/v2/beers"
- `COMMENTS_GATEWAY`: "https://63500053df22c2af7b605558.mockapi.io/beers"

## Features

The application has two main paths:

### Beers

In this path, you can explore all of beers.

### Favorite Beers

In this path, you can access your list of favorite beers. The beer IDs are stored in the localStorage. You can add beers to the favorites list and remove them as needed.

#### Reusable views

On the beer page, you can view detailed information about each beer and choose your favorite beers. Additionally, you can read comments on the beers.

#### TODOs

There are some TODOs marked in the code, but there are much more to add.
