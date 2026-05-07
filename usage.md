# B2B Leads Starter

A modular, security-oriented B2B template with admin panel and web storefront.

Template by [GrayCup](https://graycup.org) - Free to use with attribution.

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 9+
- Supabase account
- Cloudflare Turnstile keys (for security)

### Installation

```bash
pnpm install
```

### Database Setup

1. Go to your Supabase project > SQL Editor
2. Run the contents of `supabase/schema.sql`

### Configuration

#### Admin (`apps/admin/.env`)

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

#### Web (`apps/web/.env`)

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
NEXT_PUBLIC_IPINFO_TOKEN=your_ipinfo_token (optional)
SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
CASHFREE_CLIENT_ID=your_cashfree_client_id (optional)
CASHFREE_CLIENT_SECRET=your_cashfree_client_secret (optional)
```

### Customization

Edit the site config files to customize branding:

- Admin: `apps/admin/lib/site.config.ts`

### Development

```bash
pnpm dev              # All apps
pnpm dev:admin        # Admin only (port 3001)
pnpm dev:web          # Web only (port 3000)
```

### Build

```bash
pnpm build
```

## Project Structure

```
b2b-leads-starter/
  apps/
    admin/            # Admin panel (Next.js 16)
    web/              # Customer-facing web app (Next.js 15)
  supabase/
    schema.sql        # Database schema
```

## Database Tables

| Table | Purpose |
|-------|---------|
| contact_submissions | Contact form inquiries |
| quote_requests | Product quote requests |
| sample_requests | Sample requests |
| feedback_submissions | Customer feedback |
| product_requests | New product requests |
| call_requests | Callback requests |

## Security Features

- JWT authentication with HTTP-only cookies
- Cloudflare Turnstile CAPTCHA
- Row Level Security (RLS) on all tables
- Service role for admin operations
- Anonymous insert-only for public forms

## Attribution

This template is free to use. Please keep the credit links in the footer and about page.

Template by [GrayCup](https://graycup.org)
