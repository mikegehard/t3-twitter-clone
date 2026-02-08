# Development environment for t3-twitter-clone
# This Dockerfile creates the environment only - app source is mounted at runtime

FROM node:18-slim

# Install system dependencies as root
RUN apt-get update && apt-get install -y \
    git \
    curl \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Install global dev tools as root
RUN npm install -g typescript@4.9.4 eslint prettier

# Create non-root user
RUN useradd -m -s /bin/bash agentDeveloper

# Switch to non-root user
USER agentDeveloper

# Set working directory
WORKDIR /app

# Default command
CMD ["bash"]
