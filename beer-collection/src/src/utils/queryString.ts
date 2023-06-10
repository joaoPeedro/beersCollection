import { ReadonlyURLSearchParams } from "next/navigation";

type QueryStringProps = {
  key: string;
  value: string;
};

export function createQueryString(
  queryList: QueryStringProps[],
  searchParams: ReadonlyURLSearchParams
) {
  const params = new URLSearchParams(`${searchParams}`);

  queryList.map(({ key, value }) => {
    params.set(key, value);
  });

  return params.toString();
}
