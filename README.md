# A-Z Company E-commerce Platform

## Project Overview
Full-stack e-commerce application with .NET Core API backend and Next.js frontend.

## Architecture
- **Backend**: .NET 9 Web API with Entity Framework Core
- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Database**: SQL Server
- **State Management**: Zustand
- **Authentication**: ASP.NET Core Identity

## Getting Started

### Prerequisites
- .NET 9 SDK
- Node.js 22+
- SQL Server
- REDIS

### Backend Setup
```bash
docker compose build
docker compose up -d
cd API
dotnet watch or dotnet run
```
### Frontend Setup
```bash
cd frontend/web-app
npm install
npm run dev
```
### Testing
- Backend: dotnet test
- Frontend: npm test