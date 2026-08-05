# Footer & Language System Documentation

## Overview

This project includes a reusable Footer component with built-in language support and responsive design.

## Components

### Footer Component (`components/Footer.tsx`)

A fully responsive footer with 4 columns on desktop (responsive to 1 column on mobile):

1. **About** - Logo, brand name, and tagline
2. **Navigation** - Links to main pages
3. **Information** - Location, email, and phone contact details
4. **Social Media** - Links to Facebook, WhatsApp, and YouTube

Features:

- Multi-language support (French, Arabic, English)
- Responsive design using CSS Grid
- Accessible links with proper semantic HTML
- Built-in language detection from URL

## Language Management System

### Translations File (`lib/translations.ts`)

Contains all text for the footer in three languages:

- `fr` - French (default)
- `ar` - Arabic
- `en` - English

### Language Hook (`lib/useLanguage.ts`)

Provides utilities for language handling:

**`useCurrentLanguage()`** - Hook that detects current language from URL pathname

**`buildLocalizedLink(path, language)`** - Helper to build links with language prefix

Usage:

```typescript
import { useCurrentLanguage, buildLocalizedLink } from "@/lib/useLanguage";

const currentLang = useCurrentLanguage(); // Returns: "fr", "ar", or "en"
const link = buildLocalizedLink("/projets", currentLang); // Returns: "/ar/projets" or "/projets"
```

### Translation Helper (`lib/translations.ts`)

**`getTranslation(language, key)`** - Function to get translated text

```typescript
import { getTranslation } from "@/lib/translations";

const text = getTranslation("fr", "footer.home"); // Returns: "Accueil"
```

## Adding New Languages

1. Add the language code to the `languages` array in `lib/translations.ts`:

```typescript
export const languages: Language[] = ["fr", "ar", "en", "es"]; // Add "es"
```

2. Add the language type:

```typescript
export type Language = "fr" | "ar" | "en" | "es";
```

3. Add translations object:

```typescript
export const translations = {
	// ... existing translations
	es: {
		footer: {
			tagline: "«Para el ambiente, el desarrollo y la familia – desde 1996»",
			// ... rest of translations
		},
	},
};
```

## URL Structure

The application supports language-prefixed URLs:

- French: `/` (default - no prefix)
- Arabic: `/ar/...`
- English: `/en/...`

Examples:

- Home: `/` → `/ar/` → `/en/`
- Projects: `/projets` → `/ar/projets` → `/en/projets`
- Activities: `/activites` → `/ar/activites` → `/en/activites`

## Styling

Footer styles are defined in `styles/footer.module.css` with:

- Desktop: 4-column layout
- Tablet: 2-column layout
- Mobile: Single column layout

CSS Classes:

- `.footer` - Main footer container
- `.footerContent` - 4-column grid
- `.column` - Generic column styling
- `.socialLinks` - Social media icons container
- `.footerBottom` - Legal links and copyright section

## Adding Footer to New Pages

The Footer is automatically included in all pages via the root layout. No additional setup needed!

However, if you create a new route layout, ensure you don't redefine the `<html>` and `<body>` tags:

```typescript
// ❌ Wrong - Creates nested html/body tags
export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// ✅ Correct - Let root layout handle html/body
export default function Layout({ children }) {
  return children;
}
```

## Customization

### Changing Footer Colors

Modify `styles/footer.module.css`:

```css
.footer {
	background-color: #3d7b3f; /* Change this color */
	color: white;
}
```

### Updating Contact Information

Edit the Footer component (`components/Footer.tsx`) to update phone number, email, or social media links.

### Modifying Navigation Links

Update the navigation links array in the Footer component or add/remove links as needed.

## Responsive Breakpoints

- Desktop (1025px+): 4 columns
- Tablet (769px-1024px): 2 columns
- Mobile (768px and below): 1 column

## Accessibility Features

- Semantic HTML structure
- Proper link ARIA labels
- High contrast colors
- Keyboard navigable
- SVG logo with fallback

## Performance

- Minimal dependencies
- CSS Grid for layout (native browser support)
- SVG logo (no image requests)
- Optimized for fast loading

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
