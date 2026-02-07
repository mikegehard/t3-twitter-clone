# Development container for t3-twitter-clone
# This is environment-only - app source is mounted at runtime

FROM node:18-slim

# Install system dependencies as root
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Install global dev tools as root (before USER switch)
RUN npm install -g typescript@4.9.4 eslint prisma

# Create non-root user
RUN useradd -m -s /bin/bash agentDeveloper

# Switch to non-root user
USER agentDeveloper

# Set working directory
WORKDIR /app

# Default command
CMD ["bash"]
