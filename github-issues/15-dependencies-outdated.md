**Title:** 📦 Update Outdated Dependencies

**Labels:** `dependencies`, `enhancement`

---

## Description
Several dependencies are outdated and may have security vulnerabilities.

## Current Versions
- React: 16.13.1 → Latest: 18.x
- react-scripts: 3.4.1 → Latest: 5.x
- Testing library packages are outdated

## Recommendation
```bash
npm update
npm audit fix
```

Consider major version updates:
1. Update to React 18
2. Update react-scripts
3. Update testing libraries
4. Test thoroughly after updates

## Acceptance Criteria
- [ ] Review `npm audit` output
- [ ] Update dependencies
- [ ] Run all tests after update
- [ ] Verify app works correctly
- [ ] Set up Dependabot for future updates
