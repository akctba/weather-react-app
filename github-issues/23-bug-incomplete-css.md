**Title:** 🐛 Fix Incomplete CSS text-shadow Property

**Labels:** `bug`, `css`, `good first issue`

---

## Description
text-shadow property is missing the alpha value in rgba().

## Current Code
**File:** `src/index.css` (Line 98)
```css
text-shadow: 3px 3px rgba(50, 50, 70,);
```

## Fix
```css
text-shadow: 3px 3px rgba(50, 50, 70, 0.5);
```

## Acceptance Criteria
- [ ] Add missing alpha value (0.5 or similar)
- [ ] Verify text shadow displays correctly
- [ ] No CSS warnings in console
