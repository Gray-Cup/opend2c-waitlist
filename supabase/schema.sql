-- OpenD2C Waitlist Schema

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  person_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  gst_number TEXT,
  website TEXT,
  email TEXT NOT NULL,
  platforms TEXT[] DEFAULT '{}',
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role has full access to waitlist"
  ON waitlist FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can insert into waitlist"
  ON waitlist FOR INSERT WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_resolved ON waitlist(resolved);
