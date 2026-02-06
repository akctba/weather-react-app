**Title:** 🐛 loadWeather Function Doesn't Return Promise

**Labels:** `bug`, `code-quality`

---

## Description
The `loadWeather` function in Context.js doesn't return the fetch promise, so it always returns undefined.

## Current Code
**File:** `src/Context.js` (Lines 27-34)
```javascript
const loadWeather = (place) => {
    fetch(`${api.base}weather?q=${place}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
        console.log(result);
        return result;  // This doesn't return from loadWeather!
    });
}
```

## Fix
```javascript
const loadWeather = (place) => {
    return fetch(`${api.base}weather?q=${place}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            return result;
        });
}
```

## Acceptance Criteria
- [ ] Add `return` statement before `fetch`
- [ ] Function returns Promise
- [ ] Related to issue #3 (add error handling)
