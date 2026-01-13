#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Carrd Clone Frontend Demo...${NC}"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    echo ""
fi

echo -e "${GREEN}✨ Starting development server...${NC}"
echo -e "${YELLOW}➜  Local:   http://localhost:5173${NC}"
echo ""
echo -e "${GREEN}No backend needed - everything runs in your browser!${NC}"
echo ""

npm run dev
