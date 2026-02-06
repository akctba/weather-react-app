**Title:** 🔧 Add PropTypes Validation to Components

**Labels:** `code-quality`, `enhancement`

---

## Description
Components don't validate their props, making it harder to catch bugs during development.

## Components Needing PropTypes

### LanguageCombo.js
```javascript
import PropTypes from 'prop-types';

LanguageCombo.propTypes = {
    default: PropTypes.string.isRequired,
    onChange: PropTypes.func
};
```

## Acceptance Criteria
- [ ] Install prop-types if not already present
- [ ] Add PropTypes to LanguageCombo
- [ ] Add PropTypes to any other components receiving props
- [ ] Verify warnings appear for invalid props in development
