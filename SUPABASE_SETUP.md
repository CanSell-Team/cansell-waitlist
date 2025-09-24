# Supabase Setup Guide

## Database Table Setup

You need to create a table in your Supabase database to store contact form submissions.

### 1. Create the Table

Run this SQL in your Supabase SQL editor:

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_phone ON contact_submissions(phone);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
```

### 2. Set Row Level Security (RLS)

Enable RLS and create policies:

```sql
-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert new submissions
CREATE POLICY "Allow anonymous insert" ON contact_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all submissions (optional)
CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT TO authenticated
  USING (true);
```

### 3. Environment Variables

The application uses these environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key

These are already configured in:
- `.env.local` (for local development)
- `docker-compose.yml` (for Docker deployment)
- `Dockerfile` (for production builds)

### 4. Testing the Integration

1. Start your development server: `npm run dev`
2. Go to your contact form
3. Submit an email or phone number
4. Check your Supabase dashboard to see the new submission
5. You should see a success toast notification

### 5. Docker Deployment

To build and run with Docker:

```bash
# Build the image
./build-docker.sh

# Or manually:
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://qbbkhmneutnvirobtyfn.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here \
  -t cansell-store .

# Run the container
docker run -p 3000:3000 cansell-store
```

Or use docker-compose:

```bash
docker-compose up -d
```
