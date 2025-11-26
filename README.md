# Lalila - E-Commerce Platform

A modern full-stack e-commerce platform with 3D product visualization.

## Project Structure

```
Lalila/
├── client/                 # React + Vite + TypeScript Frontend
│   ├── src/
│   │   ├── api/           # API client and hooks
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── shared/        # Shared contexts and utilities
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layouts/       # Layout components
│   │   ├── types.ts       # TypeScript interfaces
│   │   ├── constants.ts   # App constants
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/            # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── .env.example
│
├── server/                # Express + MongoDB + Mongoose Backend
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── types/         # TypeScript interfaces
│   │   ├── utils/         # Utility functions
│   │   └── app.ts
│   ├── dist/              # Compiled JavaScript
│   ├── package.json
│   ├── tsconfig.json
│   ├── nodemon.json
│   └── .env.example
│
└── README.md
```

## Technology Stack

### Frontend

- **React** 19.2.0
- **Vite** 6.2.0
- **TypeScript** 5.8.2
- **React Router** 6.22.3
- **TanStack React Query** 5.28.4
- **Three.js** & **@react-three** for 3D visualization
- **Framer Motion** for animations
- **Axios** for HTTP requests
- **Lucide React** for icons

### Backend

- **Express.js** 4.18.2
- **MongoDB** with **Mongoose** 8.0.0
- **TypeScript** 5.3.3
- **Nodemon** for development
- **CORS** for cross-origin requests

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- MongoDB running locally or connection string

### Installation

#### Client Setup

```bash
cd client
npm install
npm run dev        # Start development server
npm run build      # Build for production
```

#### Server Setup

```bash
cd server
npm install
npm run dev        # Start development server with nodemon
npm run build      # Compile TypeScript
npm start          # Start production server
```

### Environment Variables

**client/.env.example**

```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Lalila Shop
```

**server/.env.example**

```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/lalila
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Features

- ✅ Responsive design
- ✅ 3D product visualization
- ✅ Shopping cart functionality
- ✅ Admin dashboard for product management
- ✅ Dark/Light theme support
- ✅ TypeScript throughout
- ✅ Modern API architecture

## Development

The frontend proxy is configured to forward `/api` requests to
`http://localhost:3000/api`, so you only need to run the client on `5173` and
server on `3000`.

## License

MIT
