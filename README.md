# Echo Heart - AI Emotional Support Companion

Echo Heart is a compassionate AI companion designed to provide emotional support and meaningful conversations. Built with modern web technologies, it offers a safe and uplifting space where users can share their feelings and receive empathetic responses.

## Features

- 🎯 Real-time chat interface with smooth animations
- 🎨 Beautiful, responsive design with dark mode support
- 💬 Empathetic AI responses powered by GPT-4
- 🔄 Message history management
- 🌙 Dark/Light theme toggle
- ⚡ Fast and responsive user experience

## Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS
  - Shadcn/ui components
  - Framer Motion for animations
- **AI Integration**: OpenAI GPT-4 API
- **Runtime**: Edge Runtime for optimal performance
- **State Management**: React Hooks
- **Development Tools**:
  - ESLint for code quality
  - Prettier for code formatting

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

```
echoheart/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # Chat API endpoint
│   ├── chat/
│   │   └── page.tsx       # Chat interface
│   └── page.tsx           # Landing page
├── components/
│   └── ui/               # Reusable UI components
├── utils/
│   └── openai.ts         # OpenAI configuration
└── public/              # Static assets
```

## Key Features Explained

### Chat Interface
- Real-time message updates
- Typing indicators
- Message timestamps
- Smooth animations for message transitions
- Responsive design for all screen sizes

### AI Integration
- Powered by GPT-4 for natural conversations
- Custom system prompt for emotional support
- Error handling and retry mechanisms
- Edge runtime for faster response times

### User Experience
- Clean and modern UI design
- Dark/Light theme support
- Responsive layout
- Loading states and animations
- Error handling with user feedback

## Environment Variables

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your own purposes.

---

Built with ❤️ using Next.js and OpenAI
