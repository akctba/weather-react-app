**Title:** ⚡ Optimize Background Images

**Labels:** `performance`, `enhancement`

---

## Description
Background images are loaded from external URLs, which may affect performance and reliability.

## Current State
- `src/index.css` Line 12 - External URL
- `src/weatherreactapp.css` Line 3 - External URL

## Recommendation
1. Download images to `/public/images/`
2. Optimize/compress images
3. Update CSS to use local paths
4. Consider using WebP format with fallbacks

## Acceptance Criteria
- [ ] Download and optimize background images
- [ ] Store in `/public/images/`
- [ ] Update CSS references
- [ ] Test loading performance
- [ ] Ensure images still display correctly
