type getDataProps = {
  endPoint: string;
  apiKey?: string;
};

export async function getJsonData<T>({ endPoint, apiKey = "" }: getDataProps) {
  const res = await fetch(`${endPoint}`, {
    headers: {
      "Content-Type": "application/json",
      "API-KEY": apiKey,
    },
  });

  if (!res.ok) return undefined;

  const data: T = await res.json();

  return data;
}
