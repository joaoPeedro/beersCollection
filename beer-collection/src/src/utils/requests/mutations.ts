type sendJsonDataProps = {
  endPoint: string;
  apiKey?: string;
  data: object;
};

export async function sendJsonData<T>({
  endPoint,
  apiKey = "",
  data,
}: sendJsonDataProps) {
  const response = await fetch(`${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": apiKey,
    },
    body: JSON.stringify(data),
  });

  const responseJson: T = await response.json();

  return responseJson;
}
