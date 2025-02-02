# Bland.ai Voice Chat Boilerplate

This is a boilerplate for building web voice agents using Bland.ai's API, enabling real-time voice conversations with an AI agent. Please note that this project will not be actively maintained.

## Prerequisites

- Subscribe to my Youtube Channel: https://www.youtube.com/@learntobuildai/videos
- Node.js (v16 or higher)
- npm (Node Package Manager)
- A Bland.ai API key (Get one at [bland.ai](https://bland.ai))

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ali-abassi/bland_boilerplate.git
   cd bland_boilerplate/voice-chat
   ```

2. **Set up environment variables**:
   - Copy the example environment file:
     
     ```bash
     cp .env.local.EXAMPLE .env.local
     ```
   - Open `.env.local` in your text editor and replace `your_api_key_here` with your Bland.ai API key.

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000`

## Features

- Real-time voice conversations with AI.
- Customizable AI agent configuration.
- Simple and intuitive user interface.

## Configuration

You can customize the AI agent's behavior by modifying the settings in `src/config/agent-config.ts`.

## Environment Variables

Required environment variables in `.env.local`:
