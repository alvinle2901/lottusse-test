# Full Stack Application

This is a mobile-friendly full stack application built with Java Spring Boot, Redis, and Docker for the backend, and Next.js with TailwindCSS for the frontend.

<img src="https://i.ibb.co/bJsvkS2/Screenshot-2025-01-17-141659.png" alt="Sample Image" width="100%">

<img src="https://i.ibb.co/LJCGL2F/Screenshot-20250117-142151-Chrome.jpg" alt="Sample Image" width="30%">

https://lottusse.vercel.app/

## Backend

### Technologies
- Java Spring Boot
- Redis Cloud
- Docker
- Deploying on Render
- BE access: https://lottusse-1-latest.onrender.com

### Setup
1. Clone the repository:
  ```sh
  git clone https://github.com/alvinle2901/lottusse-test.git
  cd lottusse-test/server
  ```
2. Build the Docker image:
  ```sh
  docker build -t your-backend-image .
  ```
3. Run the Docker container:
  ```sh
  docker run -p 8080:8080 your-backend-image
  ```

## Frontend

### Technologies
- Next.js
- TailwindCSS

### Setup
1. Navigate to the frontend directory:
  ```sh
  cd ../client
  ```
2. Install dependencies:
  ```sh
  npm install
  ```
3. Run the development server:
  ```sh
  npm run dev
  ```
