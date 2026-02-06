#!/bin/bash

# Issue 06
cat > 06-accessibility-missing-form-element.md << 'EOF'
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
EOF

# Issue 07
cat > 07-code-quality-unused-component.md << 'EOF'
**Title:** 🧹 Remove Unused AppBoot Component

**Labels:** `code-quality`, `cleanup`, `good first issue`

---

## Description
The `AppBoot.js` component is imported but commented out and never used. This adds unnecessary code to the repository.

## Current State
- `src/AppBoot.js` - 102 lines of unused code
- `src/index.js` Line 4 - Commented import
- `src/index.js` Line 10 - Commented usage

## Options

### Option 1: Remove Completely (Recommended)
If AppBoot is not needed:
- Delete `src/AppBoot.js`
- Delete `src/weatherreactapp.css`
- Remove commented lines from `src/index.js`

### Option 2: Move to Archive
If you want to keep it for reference:
- Create `src/archive/` folder
- Move AppBoot.js there
- Document why it was archived

## Acceptance Criteria
- [ ] Decision made: remove or archive
- [ ] AppBoot.js removed/archived
- [ ] Commented code removed from index.js
- [ ] weatherreactapp.css handled appropriately
- [ ] App still works correctly
EOF

# Issue 08
cat > 08-code-quality-commented-code.md << 'EOF'
**Title:** 🧹 Remove Commented Out Code

**Labels:** `code-quality`, `cleanup`, `good first issue`

---

## Description
Several files contain commented-out code that should be removed. Version control (git) is sufficient for tracking old code.

## Locations

### src/index.js
Line 3: `// import './index.css';`
Line 10: `{/* <AppBoot /> */}`

### public/index.html  
Lines 44-45: Commented jQuery and Popper.js scripts

## Recommendation
Remove all commented code. If specific code needs to be preserved for reference, document it in README or separate documentation file.

## Acceptance Criteria
- [ ] Remove commented imports from index.js
- [ ] Remove commented components from index.js
- [ ] Remove commented scripts from index.html (or uncomment if needed)
- [ ] Verify application still works
EOF

