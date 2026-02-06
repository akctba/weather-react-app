**Title:** 📝 Fix Typo in Language Data: Macedonianv

**Labels:** `bug`, `typo`, `good first issue`

---

## Description
Extra 'v' in "Macedonianv" in language options.

## Current Code
**File:** `src/LanguageCombo.js` (Line 30)
```javascript
{freq: false, code:"mk", lang:"Macedonianv"},
```

## Fix
```javascript
{freq: false, code:"mk", lang:"Macedonian"},
```

## Acceptance Criteria
- [ ] Remove extra 'v' from "Macedonianv"
- [ ] Verify language selector displays correctly
