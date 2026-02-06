**Title:** 📝 Fix Spelling Errors in dateBuilder Function

**Labels:** `bug`, `typo`, `good first issue`

---

## Description
Spelling errors in month and day names arrays.

## Current Code
**File:** `src/App.js`
- Line 30: "Septerber" → should be "September"
- Line 31: "Fraday" → should be "Friday"

## Fix
```javascript
let months = ["January", "February", "March", "April", "May", "June", "July", 
              "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
```

## Acceptance Criteria
- [ ] Fix "Septerber" → "September"
- [ ] Fix "Fraday" → "Friday"
- [ ] Test date display shows correct spelling
