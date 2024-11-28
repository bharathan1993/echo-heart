import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: 'Say hello!'
          }
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Test API Error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
