#!/bin/bash

# Build Docker image with Supabase environment variables
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://qbbkhmneutnvirobtyfn.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiYmtobW5ldXRudmlyb2J0eWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NzM3MTMsImV4cCI6MjA3NDI0OTcxM30.d366HsawABqpFgVss-eTFdZtykbaK539_C8h9_99eH8 \
  -t cansell-store .

echo "Docker image built successfully!"
echo "To run: docker run -p 3000:3000 cansell-store"
