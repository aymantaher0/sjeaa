.PHONY: help up down dev dev-down logs restart build clean migrate seed reset

# Colors for output
GREEN  := \033[0;32m
YELLOW := \033[0;33m
NC     := \033[0m # No Color

help: ## Show this help message
	@echo '$(GREEN)Carrd Clone - Docker Commands$(NC)'
	@echo ''
	@echo 'Usage:'
	@echo '  make [command]'
	@echo ''
	@echo 'Commands:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

up: ## Start production environment
	@echo "$(GREEN)Starting production environment...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)Application started!$(NC)"
	@echo "Frontend: http://localhost"
	@echo "Backend:  http://localhost:3000"

down: ## Stop production environment
	@echo "$(YELLOW)Stopping production environment...$(NC)"
	docker-compose down

dev: ## Start development environment with hot reload
	@echo "$(GREEN)Starting development environment...$(NC)"
	docker-compose -f docker-compose.dev.yml up

dev-down: ## Stop development environment
	@echo "$(YELLOW)Stopping development environment...$(NC)"
	docker-compose -f docker-compose.dev.yml down

logs: ## View logs from all services
	docker-compose logs -f

logs-backend: ## View backend logs only
	docker-compose logs -f backend

logs-frontend: ## View frontend logs only
	docker-compose logs -f frontend

logs-db: ## View database logs only
	docker-compose logs -f db

restart: ## Restart all services
	@echo "$(YELLOW)Restarting services...$(NC)"
	docker-compose restart

restart-backend: ## Restart backend only
	docker-compose restart backend

restart-frontend: ## Restart frontend only
	docker-compose restart frontend

build: ## Rebuild all images
	@echo "$(GREEN)Building images...$(NC)"
	docker-compose build

build-backend: ## Rebuild backend image only
	docker-compose build backend

build-frontend: ## Rebuild frontend image only
	docker-compose build frontend

migrate: ## Run database migrations
	@echo "$(GREEN)Running database migrations...$(NC)"
	docker-compose exec backend npm run db:migrate

seed: ## Seed database with templates
	@echo "$(GREEN)Seeding database...$(NC)"
	docker-compose exec backend npm run db:seed

clean: ## Remove all containers, networks, and volumes
	@echo "$(YELLOW)Cleaning up Docker resources...$(NC)"
	docker-compose down -v
	@echo "$(GREEN)Cleanup complete!$(NC)"

reset: clean up ## Reset everything and start fresh
	@echo "$(GREEN)Application reset and started!$(NC)"

ps: ## Show running containers
	docker-compose ps

shell-backend: ## Open shell in backend container
	docker-compose exec backend sh

shell-frontend: ## Open shell in frontend container
	docker-compose exec frontend sh

shell-db: ## Open PostgreSQL shell
	docker-compose exec db psql -U postgres -d carrd_clone

backup-db: ## Backup database to backup.sql
	@echo "$(GREEN)Backing up database...$(NC)"
	docker-compose exec -T db pg_dump -U postgres carrd_clone > backup.sql
	@echo "$(GREEN)Database backed up to backup.sql$(NC)"

restore-db: ## Restore database from backup.sql
	@echo "$(YELLOW)Restoring database from backup.sql...$(NC)"
	docker-compose exec -T db psql -U postgres carrd_clone < backup.sql
	@echo "$(GREEN)Database restored!$(NC)"

install: ## First time setup
	@echo "$(GREEN)Setting up Carrd Clone...$(NC)"
	@if [ ! -f .env ]; then \
		cp .env.docker .env; \
		echo "$(YELLOW)Created .env file. Please edit it and set JWT_SECRET$(NC)"; \
	fi
	@echo "$(GREEN)Setup complete! Run 'make up' to start the application$(NC)"
