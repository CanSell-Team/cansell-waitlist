# Docker Deployment Guide for CanSell

This guide explains how to deploy the CanSell application using Docker.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## Quick Start

### Development

```bash
# Build and run development environment
docker-compose --profile dev up --build

# Access the application at http://localhost:3012
```

### Production

```bash
# Build and run production environment
docker-compose -f docker-compose.prod.yml up --build -d

# Access the application at http://localhost:3000
```

## Docker Commands

### Build the image

```bash
# Production build
docker build -t cansell:latest .

# Development build
docker build -f Dockerfile.dev -t cansell:dev .
```

### Run the container

```bash
# Production
docker run -p 3000:3000 cansell:latest

# Development
docker run -p 3012:3012 -v $(pwd):/app cansell:dev
```

## Environment Variables

The following environment variables can be configured:

- `NODE_ENV`: Set to `production` or `development`
- `PORT`: Application port (default: 3000 for production, 3012 for development)
- `NEXT_TELEMETRY_DISABLED`: Set to `1` to disable Next.js telemetry

## Production Deployment

### With Nginx (Recommended)

```bash
# Run with Nginx reverse proxy
docker-compose -f docker-compose.prod.yml --profile nginx up -d
```

### Without Nginx

```bash
# Run application only
docker-compose -f docker-compose.prod.yml up -d
```

## Health Checks

The application includes health checks:

- **Endpoint**: `http://localhost:3000`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3

## Security Features

- Non-root user execution
- Security headers (X-Frame-Options, CSP, etc.)
- Rate limiting (when using Nginx)
- Minimal Alpine Linux base image

## Performance Optimizations

- Multi-stage build for smaller image size
- Standalone Next.js output
- Image optimization (WebP, AVIF)
- Gzip compression
- Static file caching

## Monitoring

### View logs

```bash
# Application logs
docker-compose logs -f cansell-app

# All services logs
docker-compose logs -f
```

### Container status

```bash
# Check running containers
docker-compose ps

# Container health
docker inspect cansell-app | grep -A 10 Health
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   
   # Kill the process or use different port
   docker run -p 3001:3000 cansell:latest
   ```

2. **Build failures**
   ```bash
   # Clean build cache
   docker system prune -a
   
   # Rebuild without cache
   docker build --no-cache -t cansell:latest .
   ```

3. **Permission issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Debug Mode

```bash
# Run with debug logs
docker run -e DEBUG=* -p 3000:3000 cansell:latest
```

## Scaling

### Horizontal scaling

```bash
# Scale to 3 instances
docker-compose -f docker-compose.prod.yml up --scale cansell-app=3 -d
```

### Load balancing

Use the provided Nginx configuration for load balancing multiple instances.

## Backup and Recovery

### Backup

```bash
# Backup application data
docker run --rm -v cansell_data:/data -v $(pwd):/backup alpine tar czf /backup/cansell-backup.tar.gz -C /data .
```

### Recovery

```bash
# Restore application data
docker run --rm -v cansell_data:/data -v $(pwd):/backup alpine tar xzf /backup/cansell-backup.tar.gz -C /data
```

## Updates

### Rolling updates

```bash
# Update application
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

### Zero-downtime deployment

Use Docker Swarm or Kubernetes for zero-downtime deployments in production environments.
