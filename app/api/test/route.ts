import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    apiKey: process.env.OPENAI_API_KEY ? 'Present' : 'Missing',
    apiKeyLength: process.env.OPENAI_API_KEY?.length || 0,
  });
}
