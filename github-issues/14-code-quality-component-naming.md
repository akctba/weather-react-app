**Title:** 🔧 Fix Component Naming Convention in LanguageCombo

**Labels:** `code-quality`, `good first issue`

---

## Description
Component function name starts with lowercase, violating React conventions.

## Current Code
**File:** `src/LanguageCombo.js` (Line 55)
```javascript
function languageCombo(props) {
```

## Fix
```javascript
function LanguageCombo(props) {
```

Also update the export if needed:
```javascript
export default LanguageCombo;
```

## Acceptance Criteria
- [ ] Rename function to PascalCase
- [ ] Verify component still works
- [ ] Check export statement matches
