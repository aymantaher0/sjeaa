# Quick Start Guide - 5 Minutes to Running App

Get the Carrd Clone website builder running in under 5 minutes using Docker!

## Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Git installed

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd sjeaa
```

## Step 2: Generate Secure JWT Secret

```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Copy the output - you'll need it in the next step.

## Step 3: Set Environment Variables

```bash
cp .env.docker .env
```

Edit `.env` and paste your JWT secret:

```env
JWT_SECRET=paste-your-generated-secret-here
```

## Step 4: Start the Application

### Option A: Using the Helper Script

```bash
./docker.sh install  # First time setup
./docker.sh up       # Start the application
```

### Option B: Using Make (if you have it)

```bash
make install  # First time setup
make up       # Start the application
```

### Option C: Using Docker Compose Directly

```bash
docker-compose up -d
```

## Step 5: Access the Application

Open your browser and go to:

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000

## First Use

1. Click "Sign Up" to create an account
2. Enter your email and password
3. Click "Create New Site" on the dashboard
4. Start building your website!

## Useful Commands

### Using the Helper Script

```bash
./docker.sh up        # Start
./docker.sh down      # Stop
./docker.sh logs      # View logs
./docker.sh restart   # Restart
./docker.sh clean     # Remove everything
./docker.sh help      # Show all commands
```

### Using Make

```bash
make up        # Start
make down      # Stop
make logs      # View logs
make restart   # Restart
make clean     # Remove everything
make help      # Show all commands
```

### Using Docker Compose

```bash
docker-compose up -d          # Start
docker-compose down           # Stop
docker-compose logs -f        # View logs
docker-compose restart        # Restart
docker-compose down -v        # Remove everything
```

## Development Mode (with Hot Reload)

For development with automatic code reloading:

```bash
# Using helper script
./docker.sh dev

# Using make
make dev

# Using docker-compose
docker-compose -f docker-compose.dev.yml up
```

Your code changes will automatically reload in both frontend and backend!

## Troubleshooting

### Port 80 already in use?

Edit `docker-compose.yml` and change the frontend port:

```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Changed from "80:80"
```

Then access at http://localhost:8080

### Port 3000 already in use?

Edit `docker-compose.yml` and change the backend port:

```yaml
services:
  backend:
    ports:
      - "3001:3000"  # Changed from "3000:3000"
```

Update frontend to use new backend URL in `docker-compose.yml`:

```yaml
services:
  frontend:
    build:
      args:
        VITE_API_URL: http://localhost:3001
```

### Database connection issues?

Wait a few seconds for the database to fully start, then restart:

```bash
./docker.sh restart
# or
docker-compose restart backend
```

### Want to start fresh?

```bash
./docker.sh clean     # Removes everything
./docker.sh up        # Start fresh
# or
make reset
```

## What's Running?

- **PostgreSQL Database**: Stores all your data
- **Backend API**: Node.js/Express server on port 3000
- **Frontend**: React app served by nginx on port 80

## Next Steps

- Read [DOCKER.md](DOCKER.md) for advanced Docker usage
- Read [README.md](README.md) for detailed documentation
- Check out the [Usage Guide](README.md#usage-guide) to learn how to build sites

## Need Help?

- Check the logs: `./docker.sh logs`
- See all commands: `./docker.sh help`
- Open an issue on GitHub

Enjoy building websites! 🚀
