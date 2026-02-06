**Title:** 📝 Fix Font Family Typo and Add Import

**Labels:** `enhancement`, `typo`

---

## Description
Font family 'montseratt' is likely a typo and is not imported.

## Current Code
**File:** `src/index.css` (Line 8)
```css
font-family: 'montseratt', sans-serif;
```

## Recommended Solution

### Option 1: Use Montserrat from Google Fonts
In `public/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700;900&display=swap" rel="stylesheet">
```

In CSS:
```css
font-family: 'Montserrat', sans-serif;
```

### Option 2: Use System Fonts
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
```

## Acceptance Criteria
- [ ] Fix typo or choose different font
- [ ] Import font if using custom font
- [ ] Add fallback fonts
- [ ] Test font displays correctly
