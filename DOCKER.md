# Docker Deployment Guide

This guide will help you deploy the Carrd Clone application using Docker.

## Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 2.0+)

Install Docker: https://docs.docker.com/get-docker/

## Quick Start (Production)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sjeaa
```

### 2. Set Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.docker .env
```

Edit `.env` and set a secure JWT secret:

```bash
# Generate a secure secret
openssl rand -base64 32

# Add it to .env
JWT_SECRET=your-generated-secret-here
```

### 3. Build and Start

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### 4. Access the Application

- Frontend: http://localhost
- Backend API: http://localhost:3000
- Database: localhost:5432

The database migrations will run automatically on first startup.

## Development Mode (with Hot Reload)

For development with hot reloading:

```bash
# Start in development mode
docker-compose -f docker-compose.dev.yml up

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop
docker-compose -f docker-compose.dev.yml down
```

Development mode features:
- Hot reload for both frontend and backend
- Source code mounted as volumes
- Automatic npm install on container start
- Development environment variables

## Available Commands

### Production

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Restart a service
docker-compose restart [service-name]

# Rebuild images
docker-compose build

# Remove all volumes (WARNING: deletes database)
docker-compose down -v
```

### Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# Rebuild development containers
docker-compose -f docker-compose.dev.yml build

# Run migrations manually
docker-compose -f docker-compose.dev.yml exec backend npm run db:migrate

# Seed database with templates
docker-compose -f docker-compose.dev.yml exec backend npm run db:seed
```

## Service Ports

| Service  | Internal Port | External Port |
|----------|---------------|---------------|
| Frontend | 80            | 80            |
| Backend  | 3000          | 3000          |
| Database | 5432          | 5432          |

## Environment Variables

### Backend

| Variable          | Default                  | Description                    |
|-------------------|--------------------------|--------------------------------|
| PORT              | 3000                     | Backend server port            |
| NODE_ENV          | production               | Node environment               |
| DB_HOST           | db                       | Database host                  |
| DB_PORT           | 5432                     | Database port                  |
| DB_NAME           | carrd_clone              | Database name                  |
| DB_USER           | postgres                 | Database user                  |
| DB_PASSWORD       | postgres                 | Database password              |
| JWT_SECRET        | (required)               | JWT signing secret             |
| JWT_EXPIRES_IN    | 7d                       | JWT token expiration           |
| FRONTEND_URL      | http://localhost         | Frontend URL for CORS          |
| PUBLISH_DIR       | /app/published_sites     | Directory for published sites  |
| SUBDOMAIN_BASE    | app-domain.com           | Base domain for subdomains     |

### Frontend

| Variable          | Default                  | Description                    |
|-------------------|--------------------------|--------------------------------|
| VITE_API_URL      | http://localhost:3000    | Backend API URL                |

## Volumes

### Production

- `postgres_data`: PostgreSQL database data
- `published_sites`: Published website files

### Development

- `postgres_data_dev`: PostgreSQL database data (dev)
- `published_sites_dev`: Published website files (dev)
- `./backend`: Backend source code (mounted)
- `./frontend`: Frontend source code (mounted)

## Database Management

### Access PostgreSQL

```bash
# Production
docker-compose exec db psql -U postgres -d carrd_clone

# Development
docker-compose -f docker-compose.dev.yml exec db psql -U postgres -d carrd_clone
```

### Backup Database

```bash
# Create backup
docker-compose exec db pg_dump -U postgres carrd_clone > backup.sql

# Restore backup
docker-compose exec -T db psql -U postgres carrd_clone < backup.sql
```

### Reset Database

```bash
# Stop services
docker-compose down

# Remove database volume
docker volume rm sjeaa_postgres_data

# Start again (will recreate database)
docker-compose up -d
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs [service-name]

# Restart specific service
docker-compose restart [service-name]

# Rebuild and restart
docker-compose up -d --build
```

### Database connection issues

```bash
# Check if database is healthy
docker-compose ps

# Wait for database to be ready
docker-compose exec backend sh -c 'until nc -z db 5432; do sleep 1; done'

# Check database logs
docker-compose logs db
```

### Port already in use

If port 80, 3000, or 5432 is already in use, modify the port mappings in `docker-compose.yml`:

```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Change external port to 8080
```

### Permission issues

```bash
# Fix volume permissions
docker-compose exec backend chown -R node:node /app

# Or run as root temporarily
docker-compose exec -u root backend chown -R node:node /app
```

### Clear everything and start fresh

```bash
# Stop and remove all containers, networks, and volumes
docker-compose down -v

# Remove all unused Docker resources
docker system prune -a

# Start fresh
docker-compose up -d --build
```

## Production Deployment

### Deploy to Cloud (AWS, GCP, Azure)

1. **Push images to container registry**:

```bash
# Build images
docker-compose build

# Tag images
docker tag sjeaa-backend:latest your-registry/carrd-backend:latest
docker tag sjeaa-frontend:latest your-registry/carrd-frontend:latest

# Push to registry
docker push your-registry/carrd-backend:latest
docker push your-registry/carrd-frontend:latest
```

2. **Update docker-compose.yml** to use registry images:

```yaml
services:
  backend:
    image: your-registry/carrd-backend:latest
    # Remove build section
```

3. **Deploy** using your cloud provider's container service

### Security Recommendations

1. **Change default credentials**:
   - Set strong `JWT_SECRET`
   - Change database password
   - Use secrets management in production

2. **Enable HTTPS**:
   - Add reverse proxy (nginx/traefik) with SSL
   - Use Let's Encrypt for certificates

3. **Limit exposed ports**:
   - Only expose frontend (port 80/443)
   - Keep backend and database internal

4. **Use environment-specific configs**:
   - Separate dev, staging, prod environments
   - Use Docker secrets for sensitive data

## Monitoring

### View Container Stats

```bash
# Real-time stats
docker stats

# Resource usage
docker-compose ps
```

### Health Checks

The database service includes health checks. Backend waits for database to be healthy before starting.

## Advanced Configuration

### Using External Database

If you want to use an external PostgreSQL database:

1. Remove the `db` service from `docker-compose.yml`
2. Update backend environment variables:

```yaml
services:
  backend:
    environment:
      DB_HOST: your-external-db-host
      DB_PORT: 5432
      DB_NAME: your-database
      DB_USER: your-user
      DB_PASSWORD: your-password
```

### Custom Domain

To use a custom domain:

1. Update `SUBDOMAIN_BASE` in backend environment
2. Configure DNS to point to your server
3. Set up SSL/TLS certificates

### Scaling

To run multiple backend instances:

```bash
docker-compose up -d --scale backend=3
```

Add a load balancer (nginx/traefik) to distribute traffic.

## Support

For issues or questions:
- Check the logs: `docker-compose logs -f`
- Open an issue on GitHub
- See main README.md for more information
