# MCAN Ekiti State Chapter – Next.js Website

A complete Next.js 14 website for the Muslim Corpers' Association of Nigeria (MCAN) Ekiti State Chapter.

## Pages Included

| Page | Route |
|------|-------|
| Home | `/` |
| About | `/about` |
| Executives | `/executives` |
| Projects | `/projects` |
| Events | `/events` |
| Donate | `/donate` |
| Contact | `/contact` |
| Register | `/register` |

## Tech Stack

- **Next.js 14** – App Router
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** – icons

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## Project Structure

```
mcan-ekiti/
├── app/
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── globals.css         # Global styles + Tailwind
│   ├── page.tsx            # Home page
│   ├── about/page.tsx      # About page
│   ├── executives/page.tsx # Executives page
│   ├── projects/page.tsx   # Projects page
│   ├── events/page.tsx     # Events page
│   ├── donate/page.tsx     # Donate page
│   ├── contact/page.tsx    # Contact page
│   └── register/page.tsx   # Register page
├── components/
│   ├── Navbar.tsx          # Responsive navbar
│   ├── Footer.tsx          # Footer with links
│   ├── ProjectCard.tsx     # Reusable project card
│   ├── PrayerTimes.tsx     # Prayer times widget
│   └── CTABanner.tsx       # Donation CTA section
└── lib/
    └── data.ts             # All site data (projects, events, executives)
```

## Customisation

### 1. Update Real Data
Edit `lib/data.ts` to add:
- Real project images and descriptions
- Actual prayer times (or connect an API like Aladhan)
- Real executive names, photos, and titles
- Real event dates and locations

### 2. Replace Images
Replace placeholder Unsplash images in `lib/data.ts` with your actual project photos.

### 3. Update Contact Info
Phone numbers and email in `app/contact/page.tsx` and footer.

### 4. Bank Details

### 5. Prayer Times API

## Color Theme

The primary brand color is **`#1a6b3c`** (dark green).
Whenever you want to change colour, change it in `tailwind.config.js` under `theme.extend.colors.primary`.
