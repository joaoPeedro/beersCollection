import { NextResponse } from "next/server";
import { limiter } from "../config/limiter";
import { getJsonData, sendJsonData } from "../../../utils";

export async function GET(request: Request) {
  const origin = request.headers.get("origin");

  const TokensRemaining = await limiter.removeTokens(1);

  if (TokensRemaining < 0) {
    return new NextResponse(null, {
      status: 429,
      statusText: "Too Many Requests",
      headers: {
        "Access-Control-Allow-Origin": "93.176.86.249",
        "Content-Type": "text/plain",
      },
    });
  }

  const comments = await getJsonData<Beer[]>({
    endPoint: `${process.env.COMMENTS_MOCK_API_GATEWAY}`,
  });

  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");

  const TokensRemaining = await limiter.removeTokens(1);

  if (TokensRemaining < 0) {
    return new NextResponse(null, {
      status: 429,
      statusText: "Too Many Requests",
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "text/plain",
      },
    });
  }

  const { name, comment, beerId }: Partial<CommentBeer> = await request.json();

  if (!name || !comment || !beerId)
    return NextResponse.json({ message: "Missing data" });

  const newComment = sendJsonData<Partial<Comment>>({
    endPoint: `${process.env.COMMENTS_MOCK_API_GATEWAY}`,
    apiKey: `${process.env.COMMENTS_MOCK_API_KEY}`,
    data: { name, comment, beerId },
  });

  return NextResponse.json(newComment);
}
