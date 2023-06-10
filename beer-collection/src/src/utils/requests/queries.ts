type getDataProps = {
  endPoint: string;
  apiKey?: string;
};

export async function getJsonData<T>({ endPoint, apiKey = "" }: getDataProps) {
  const response = await fetch(`${endPoint}`, {
    headers: {
      "Content-Type": "application/json",
      "API-KEY": apiKey,
    },
  });

  if (!response.ok) return undefined;

  const responseJson: T = await response.json();

  return responseJson;
}
