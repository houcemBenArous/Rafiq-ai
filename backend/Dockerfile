# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and npmrc
COPY package.json .npmrc ./

# Install ALL dependencies (including dev for build)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy package files and npmrc
COPY package.json .npmrc ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy built application
COPY --from=builder /app/dist ./dist

# Create ChromaDB directory
RUN mkdir -p /app/chroma_db

EXPOSE 3001

CMD ["node", "dist/main"]
