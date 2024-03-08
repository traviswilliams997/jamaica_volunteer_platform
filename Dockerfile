# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /server/index

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN cd server && apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python3

    # Install packages needed to build node modules
RUN cd client && apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python3

# Install node modules
COPY cd server &&  --link package-lock.json package.json ./
RUN cd server && npm ci --include=dev

# Install node modules
COPY cd client &&  --link package-lock.json package.json ./
RUN cd client && npm ci --include=dev

# Copy application code
COPY cd server &&  --link . .

# Copy application code
COPY cd client &&  --link . .


# Build application
RUN cd client && npm run build

# Remove development dependencies
RUN cd server &&  npm prune --omit=dev

# Remove development dependencies
RUN cd client &&  npm prune --omit=dev

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
