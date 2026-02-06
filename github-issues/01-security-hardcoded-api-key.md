**Title:** 🔴 SECURITY: Hardcoded API Key Exposed in Source Code

**Labels:** `security`, `critical`, `bug`

---

## Description

The OpenWeatherMap API key is hardcoded directly in the source code (`src/App.js`) and is exposed in the client-side bundle, making it publicly visible and vulnerable to abuse.

## Current Code

**File:** `src/App.js` (Lines 6-9)

```javascript
const api = {
    key: "720b1a41660c87e3beb3873ed2143b01",
    base: "https://api.openweathermap.org/data/2.5/"
}
```

## Impact

- ❌ API key is publicly visible in the repository and client-side code
- ❌ Can be abused by malicious actors leading to unauthorized usage
- ❌ May result in unexpected API charges
- ❌ Violates security best practices
- ❌ The exposed key must be rotated immediately

## Recommended Solution

1. **Immediately rotate the exposed API key** in your OpenWeatherMap account
2. Move API key to environment variables using `.env` file
3. Use `process.env.REACT_APP_OPENWEATHER_KEY` (pattern already used in `Context.js`)
4. Ensure `.env` is in `.gitignore` (already done ✓)
5. Create `.env.example` file with placeholder values

## Implementation

### Step 1: Create `.env` file (not committed to git)
```
REACT_APP_OPENWEATHER_KEY=your_actual_api_key_here
```

### Step 2: Update `src/App.js`
```javascript
const api = {
    key: process.env.REACT_APP_OPENWEATHER_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
}
```

### Step 3: Create `.env.example` for documentation
```
REACT_APP_OPENWEATHER_KEY=your_api_key_here
```

## Acceptance Criteria

- [ ] API key removed from `src/App.js`
- [ ] Environment variable used instead
- [ ] `.env.example` file created
- [ ] Old API key rotated in OpenWeatherMap account
- [ ] Documentation updated with setup instructions
- [ ] Verify app still works with environment variable

## Related Files

- `src/App.js` (needs fix)
- `src/Context.js` (already implements correctly)
- `.env` (to be created)
- `.env.example` (to be created)
- `.gitignore` (already configured correctly)

## References

- [Create React App - Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [OWASP - Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
