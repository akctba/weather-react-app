**Title:** 🧹 Remove Duplicate API Configuration

**Labels:** `code-quality`, `refactoring`, `good first issue`

---

## Description
API configuration is duplicated in App.js and Context.js, violating DRY principle.

## Locations
- `src/App.js` Lines 6-9
- `src/Context.js` Lines 5-8

## Recommended Solution
Create `src/config/api.js`:
```javascript
export const api = {
    key: process.env.REACT_APP_OPENWEATHER_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
};
```

Import in both files:
```javascript
import { api } from './config/api';
```

## Acceptance Criteria
- [ ] Create config file
- [ ] Remove duplicate configurations
- [ ] Import shared config
- [ ] Verify app still works
