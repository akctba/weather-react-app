**Title:** ♿ Fix React Attribute: tabindex → tabIndex

**Labels:** `accessibility`, `bug`, `good first issue`

---

## Description
Using HTML attribute `tabindex` instead of React's `tabIndex` in AppBoot.js.

**Note:** AppBoot is currently unused. If it's being removed (issue #7), this can be closed.

## Current Code
**File:** `src/AppBoot.js` (Line 81)
```javascript
<div className="modal fade" id="modalCities" tabindex="-1" ...>
```

## Fix
```javascript
<div className="modal fade" id="modalCities" tabIndex="-1" ...>
```

## Acceptance Criteria
- [ ] Change `tabindex` to `tabIndex` (capital I)
- [ ] Or close if AppBoot is removed per issue #7
