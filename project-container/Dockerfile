# Development environment for t3-twitter-clone
# This Dockerfile creates the environment only - app source is mounted at runtime

FROM node:18-slim

# Install system dependencies as root
# - git, curl: development tooling
# - openssl: required by Prisma
# - python3, make, g++: required for native module compilation (bcrypt)
RUN apt-get update && apt-get install -y \
    git \
    curl \
    openssl \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install global dev tools as root
# Versions aligned with app's devDependencies
RUN npm install -g \
    typescript@4.9.4 \
    eslint@9.39.2 \
    prettier@2.8.3 \
    prisma@4.10.1

# Create non-root user
RUN useradd -m -s /bin/bash agentDeveloper

# Switch to non-root user
USER agentDeveloper

# Set working directory
WORKDIR /app

# Default command
CMD ["bash"]
