# ChatX 🚀

A high-performance, real-time ephemeral chat application built with the **PERN** stack and **WebSockets**. ChatX allows users to create instant rooms, share codes, and communicate with zero footprints.

![ChatX Preview](/frontend/public/preview.png)

## ✨ Features

* **Real-Time Messaging**: Powered by the standard `ws` library for low-latency communication.
* **Ephemeral Rooms**: Messaging rooms that exist only as long as you need them.
* **Auto-Cleanup**: Database optimization that strictly maintains only the last 15 messages per room.
* **Modern UI**: Sleek, dark-themed interface built with Tailwind CSS and Lucide icons.
* **Secure Auth**: JWT-based authentication for private room access.
* **Responsive Design**: Fully optimized for Desktop and Mobile experiences.

## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* TypeScript
* Tailwind CSS
* Lucide React (Icons)
* Axios

**Backend:**
* Node.js & Express
* TypeScript
* WebSockets (`ws`)
* Prisma ORM
* PostgreSQL (Hosted on Neon)


## Prerequisites

* Node.js (v18+)
* PostgreSQL database (Neon recommended)

### Upcoming

1. Multi Line chat with saved formatting