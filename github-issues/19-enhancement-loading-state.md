**Title:** ✨ Add Loading State for Weather Fetches

**Labels:** `enhancement`, `ux`

---

## Description
No loading indicator while fetching weather data, leaving users unsure if their request is processing.

## Recommended Solution
```javascript
const [loading, setLoading] = useState(false);

const search = evt => {
    if (evt.key === "Enter") {
        setLoading(true);
        fetch(...)
            .then(...)
            .finally(() => setLoading(false));
    }
};

// In JSX
{loading && <div className="loading">Loading...</div>}
```

## Acceptance Criteria
- [ ] Add loading state
- [ ] Show loading indicator during fetch
- [ ] Hide indicator when complete or error
- [ ] Add CSS for loading indicator
- [ ] Consider using spinner/animation
