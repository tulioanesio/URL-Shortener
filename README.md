# URL Shortener API

This is the **backend** of the URL Shortener project, built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**. It allows users to shorten long URLs and optionally set an expiration time.

## Technologies Used

- **Node.js** – JavaScript runtime environment  
- **Express** – Web framework for Node.js  
- **Prisma** – ORM for database access  
- **PostgreSQL** – Relational database  

## Installation

Follow these steps to run the API locally:

1. **Clone the repository**:
```
git clone https://github.com/tulioanesio/URL-Shortener.git
cd URL-Shortener
```

2. **Install the dependencies**:
```
npm install
```

3. **Configure the database**:

Create a `.env` file and add your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
POSTGRES_USER: "your_postgres_user"
POSTGRES_PASSWORD: "your_postgres_password"
POSTGRES_DB: "your_postgres_database"
```

4. **Run database migrations**:
```
npx prisma migrate dev --name init
```

5. **Start the development server**:
```
npm run dev
```

The API will be running at: [http://localhost:3000](http://localhost:3000)

## Features

- Shorten long URLs into a short code
- Optional expiration time (in hours)
- Redirect to original URL using the short code
- Friendly expiration time display using Moment.js
- Handles invalid or expired URLs gracefully

## API Endpoints

### `POST /shortner`

Creates a short URL.

**Request body:**
```json
{
  "originalUrl": "https://example.com",
  "expiresIn": 2 // optional, in hours
}
```

**Response:**
```json
{
  "originalUrl": "https://example.com",
  "shortUrl": "http://localhost:3000/abc123",
  "expireAt": "Today at 5:00 PM",
  "message": "Link shortened successfully!"
}
```
