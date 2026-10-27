# Apna Job Dekho

## Page organization

- `admin/` contains the admin portal.
- `user/` contains user login, registration, dashboard, profile, subscription, and account pages.
- Shared site pages, `app.js`, and `styles.css` remain at the project root.

Company records are stored in browser `localStorage` under `apnaCompanies` as structured JSON objects containing an ID, company name, industry, location, number of open roles, description, an optional HTTP/HTTPS direct application URL, and created/updated timestamps. The admin company form manages this URL, and user company views show an Apply link when one is saved.

A premium front-end job portal demo for students, freshers, and career seekers. The site includes a homepage, job search, company directory, resume builder, interview prep, pricing section, login/register pages, dashboard, and additional informational pages.

## Features

- Landing page with hero section, job categories, featured jobs, companies, internship section, pricing cards, testimonials, FAQ, and CTA
- Search and filter jobs by title, location, industry, and experience
- Company directory and detail views
- Resume builder with live preview and PDF/print support
- Interview question practice with rule-based feedback
- Pricing plans
- Login/register and dashboard demo flows using browser localStorage
- Separate `admin/` and `user/` folders for portal pages

## Run locally

1. Open a terminal in this folder.
2. Run:
   ```bash
   npx serve -l 8000 .
   ```
3. Visit http://localhost:8000/

## Notes

- This is a front-end implementation designed for the project specification.
- Real backend authentication, database-backed admin panels, and payment processing are not implemented in this demo.
- Demo user data and application state are stored in browser localStorage for a standalone front-end experience.
