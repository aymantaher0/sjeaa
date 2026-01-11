#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to display help
show_help() {
    echo -e "${GREEN}Carrd Clone - Docker Helper Script${NC}"
    echo ""
    echo "Usage: ./docker.sh [command]"
    echo ""
    echo "Commands:"
    echo "  up          - Start production environment"
    echo "  down        - Stop production environment"
    echo "  dev         - Start development environment"
    echo "  dev-down    - Stop development environment"
    echo "  logs        - View logs from all services"
    echo "  restart     - Restart all services"
    echo "  build       - Rebuild all images"
    echo "  migrate     - Run database migrations"
    echo "  seed        - Seed database with templates"
    echo "  clean       - Remove all containers, networks, and volumes"
    echo "  reset       - Clean and restart everything"
    echo "  install     - First time setup"
    echo "  help        - Show this help message"
}

# Function to check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
        echo "Visit: https://docs.docker.com/get-docker/"
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
        echo "Visit: https://docs.docker.com/compose/install/"
        exit 1
    fi
}

# Main script
check_docker

case "$1" in
    up)
        echo -e "${GREEN}Starting production environment...${NC}"
        docker-compose up -d
        echo -e "${GREEN}Application started!${NC}"
        echo "Frontend: http://localhost"
        echo "Backend:  http://localhost:3000"
        ;;

    down)
        echo -e "${YELLOW}Stopping production environment...${NC}"
        docker-compose down
        ;;

    dev)
        echo -e "${GREEN}Starting development environment...${NC}"
        docker-compose -f docker-compose.dev.yml up
        ;;

    dev-down)
        echo -e "${YELLOW}Stopping development environment...${NC}"
        docker-compose -f docker-compose.dev.yml down
        ;;

    logs)
        docker-compose logs -f
        ;;

    restart)
        echo -e "${YELLOW}Restarting services...${NC}"
        docker-compose restart
        echo -e "${GREEN}Services restarted!${NC}"
        ;;

    build)
        echo -e "${GREEN}Building images...${NC}"
        docker-compose build
        echo -e "${GREEN}Build complete!${NC}"
        ;;

    migrate)
        echo -e "${GREEN}Running database migrations...${NC}"
        docker-compose exec backend npm run db:migrate
        ;;

    seed)
        echo -e "${GREEN}Seeding database...${NC}"
        docker-compose exec backend npm run db:seed
        ;;

    clean)
        echo -e "${YELLOW}Cleaning up Docker resources...${NC}"
        docker-compose down -v
        echo -e "${GREEN}Cleanup complete!${NC}"
        ;;

    reset)
        echo -e "${YELLOW}Resetting everything...${NC}"
        docker-compose down -v
        echo -e "${GREEN}Starting fresh...${NC}"
        docker-compose up -d
        echo -e "${GREEN}Reset complete!${NC}"
        ;;

    install)
        echo -e "${GREEN}Setting up Carrd Clone...${NC}"
        if [ ! -f .env ]; then
            cp .env.docker .env
            echo -e "${YELLOW}Created .env file. Please edit it and set JWT_SECRET${NC}"
            echo -e "${YELLOW}You can generate a secure secret with: openssl rand -base64 32${NC}"
        else
            echo -e "${YELLOW}.env file already exists${NC}"
        fi
        echo -e "${GREEN}Setup complete! Run './docker.sh up' to start the application${NC}"
        ;;

    help|*)
        show_help
        ;;
esac
