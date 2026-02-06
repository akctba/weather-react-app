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
