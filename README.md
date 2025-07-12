# Express TypeScript API

A TypeScript Express API boilerplate.

## Features

- Express.js with TypeScript
- Health check endpoint
- Structured response utilities
- Production and development modes

## Quick Start

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## API Endpoints

### Health Check

```bash
curl http://localhost:3000/health
```

### Root

```bash
curl http://localhost:3000/
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build TypeScript
- `npm start` - Start production server
- `npm run clean` - Clean build directory
- `npm run rebuild` - Clean and rebuild

## Project Structure

```
src/
├── app.ts          # Express app configuration
├── index.ts        # Production server entry point
└── utils/
    └── response.ts # Response utilities
```

# CGv1
# HHv1
# HHv1
