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
        "Content-Type": "text/plain",
      },
    });
  }

  // Verificar se a origem da solicitação é da sua VPN
  const isVPNRequest = origin === "http://93.176.86.249" || origin === "https://93.176.86.249";

  // Adicionar cabeçalhos CORS apenas se a origem for da sua VPN
  const corsHeaders: Record<string, string> = isVPNRequest
    ? {
        "Access-Control-Allow-Origin": origin || "",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    : {};

  // Verificar se é uma solicitação OPTIONS
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  const comments = await getJsonData<Beer[]>({
    endPoint: `${process.env.COMMENTS_MOCK_API_GATEWAY}`,
  });

  return NextResponse.json(comments, { headers: corsHeaders });
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
