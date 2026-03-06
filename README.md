# 🛰️ Chat X Protocol

A high-performance, minimalist WebSocket-based chat application built for instant, ephemeral communication. No databases, no tracking, just pure real-time data exchange.

## ✨ Features

- **Ephemeral Rooms**: Create or join rooms using unique 6-character secure codes.
- **Zero-Flicker Persistence**: Direct `localStorage` state initialization ensures you stay in the room even after a page refresh.
- **Smart Textarea**: Auto-expanding message input with `Shift + Enter` for new lines and `Enter` to send.
- **Real-time Presence**: Live "Active Now" counter and user list synchronized across all clients via `roomMap`.
- **Modern UI**: Cyberpunk-inspired dark aesthetic built with Tailwind CSS and Lucide icons.
- **Cryptographic IDs**: Uses `window.crypto` for strong, random room ID generation.

---

## 🚀 Tech Stack

| Component     | Technology                        |
| :------------ | :-------------------------------- |
| **Frontend**  | React 18, TypeScript, Tailwind CSS|
| **Icons**     | Lucide React                      |
| **Backend**   | Node.js, `ws` (Native WebSockets) |
| **State**     | React Hooks & `useRef`            |

---


## 🛠️ Project Structure

App.tsx: Handles global state and localStorage persistence logic.

HomePage.tsx: The landing page for creating or joining rooms.

ChatArea.tsx: The core chat engine, manages WebSocket lifecycle and UI.

ChatBubble.tsx: Reusable component for rendering sent/received messages.