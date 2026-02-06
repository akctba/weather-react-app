**Title:** 🔴 BUG: Missing Error Handling for Weather API Calls in App.js

**Labels:** `bug`, `critical`, `error-handling`

---

## Description

The fetch call in `App.js` lacks proper error handling. If the API request fails (network error) or returns an error response (city not found, invalid API key, etc.), the application will crash or behave unexpectedly without providing user feedback.

## Current Code

**File:** `src/App.js` (Lines 16-26)

```javascript
const search = evt => {
    if (evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
            setWeather(result)
            setQuery('');
            console.log(result);
        });
    }
}
```

## Problems

- ❌ No `.catch()` handler for network failures
- ❌ No check for HTTP error status codes
- ❌ No validation of API response structure
- ❌ No user feedback on errors
- ❌ Application may display incorrect data if API returns an error object

## Impact

- Poor user experience when errors occur
- Application may crash or freeze
- No indication to user why weather data isn't loading
- Debugging is difficult without error information

## Recommended Solution

Add comprehensive error handling with user-friendly error messages:

```javascript
const [error, setError] = useState(null);

const search = evt => {
    if (evt.key === "Enter") {
        setError(null); // Clear previous errors
        
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(result => {
                // Check for API-level errors
                if (result.cod && result.cod !== 200) {
                    throw new Error(result.message || 'City not found');
                }
                
                setWeather(result);
                setQuery('');
                console.log(result);
            })
            .catch(error => {
                console.error('Error fetching weather:', error);
                setError(error.message || 'Failed to fetch weather data');
                setWeather({}); // Clear previous weather data
            });
    }
}
```

### UI Update for Error Display

Add error message display in the JSX:

```javascript
{error && (
    <div className="error-box">
        <p className="error-message">{error}</p>
    </div>
)}
```

## Acceptance Criteria

- [ ] Add `.catch()` handler for network errors
- [ ] Check HTTP response status before parsing JSON
- [ ] Validate API response for error codes
- [ ] Add error state management
- [ ] Display user-friendly error messages in UI
- [ ] Clear errors on new search
- [ ] Test with invalid city names
- [ ] Test with network offline
- [ ] Add CSS styling for error messages

## Test Cases

1. Search for non-existent city → Should display "City not found"
2. Disconnect internet and search → Should display network error
3. Invalid API key → Should display authentication error
4. Valid search after error → Error message should clear

## Related Issues

- Related to issue #3 (Context.js also needs error handling)
- Dependent on issue #1 (API key must be valid)

## References

- [MDN - Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful)
- [OpenWeatherMap API Error Codes](https://openweathermap.org/faq#error401)
