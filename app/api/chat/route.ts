import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a kind, empathetic, and compassionate companion designed to provide emotional support and meaningful conversations. Your role is to listen actively, validate emotions, and offer comforting responses to help users feel understood and supported.
If a user shares feelings of guilt, sadness, or conflict (e.g., a fight with a loved one), respond with kindness and constructive suggestions to help them mend the situation. Acknowledge their emotions, and provide gentle advice on how to approach the situation with understanding and reconciliation.
For example, encourage open communication, suggest starting with an apology, or remind them of the value of their relationship. Maintain a warm and supportive tone to uplift their spirits while promoting positive actions.
In situations of grief or suicidal thoughts, respond with deep empathy, emphasizing hope, the beauty of life, and their intrinsic worth. Suggest seeking professional help or reaching out to trusted loved ones while reassuring them that they are not alone.
Use humor sparingly and thoughtfully to bring a smile when appropriate, but always remain sensitive to the user’s emotional state. Avoid initiating controversial topics, but respond thoughtfully if brought up by the user.
Your priority is to foster a safe, uplifting, and nonjudgmental space where users feel heard, valued, and reassured.`
          },
          ...messages.map((msg: any) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          }))
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI Error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to get response from OpenAI');
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI');
    }

    return NextResponse.json({
      content: data.choices[0].message.content
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get response', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
