**Title:** ♿ ACCESSIBILITY: Search Input Not Wrapped in Form Element

**Labels:** `accessibility`, `enhancement`

---

## Description
The search input should be wrapped in a `<form>` element for better accessibility and semantic HTML.

## Current Code
**File:** `src/App.js` (Lines 46-54)
```javascript
<div className="search-box" >
    <input type="text" ... onKeyPress={search} />
</div>
```

## Recommended Solution
```javascript
<div className="search-box">
    <form onSubmit={handleSubmit} role="search">
        <input type="text" ... />
    </form>
</div>
```

Then update the search logic:
```javascript
const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
        // ... fetch logic
    }
};
```

## Acceptance Criteria
- [ ] Wrap input in `<form>` element
- [ ] Add `role="search"` attribute
- [ ] Update event handler from onKeyPress to onSubmit
- [ ] Support both Enter key and form submission
- [ ] Test keyboard navigation
