**Title:** 🔴 BUG: Missing Error Handling in Context.js API Calls

**Labels:** `bug`, `critical`, `error-handling`

---

## Description

The `Context.js` file contains two API fetch calls that lack proper error handling:
1. The `loadWeather` function (lines 27-34) doesn't handle errors
2. The geolocation weather fetch (lines 53-60) doesn't handle errors
3. The `loadWeather` function doesn't return the Promise correctly

## Current Code

### Issue 1: loadWeather Function

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

**Problems:**
- ❌ No error handling
- ❌ Function doesn't return the Promise
- ❌ Always returns `undefined`

### Issue 2: Geolocation Weather Fetch

**File:** `src/Context.js` (Lines 48-64)

```javascript
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                this.setState({weather: result});
            });
    });
}
```

**Problems:**
- ❌ No error handling for fetch
- ❌ No error callback for geolocation
- ❌ No user feedback if geolocation fails
- ❌ No handling of geolocation permission denial

## Impact

- Application fails silently when errors occur
- Users get no feedback about what went wrong
- Debugging is difficult
- Poor user experience

## Recommended Solution

### Fix 1: loadWeather Function

```javascript
const loadWeather = (place) => {
    return fetch(`${api.base}weather?q=${place}&units=metric&APPID=${api.key}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(result => {
            if (result.cod && result.cod !== 200) {
                throw new Error(result.message || 'Weather data not available');
            }
            console.log(result);
            return result;
        })
        .catch(error => {
            console.error('Error loading weather:', error);
            throw error; // Re-throw to let caller handle it
        });
}
```

### Fix 2: Geolocation Error Handling

```javascript
componentDidMount() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success callback
            position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then(result => {
                        if (result.cod && result.cod !== 200) {
                            throw new Error(result.message);
                        }
                        console.log(result);
                        this.setState({weather: result});
                    })
                    .catch(error => {
                        console.error('Error fetching weather by location:', error);
                        this.setState({
                            error: 'Failed to load weather for your location'
                        });
                    });
            },
            // Error callback
            error => {
                console.error('Geolocation error:', error);
                let errorMessage;
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location permission denied";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information unavailable";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out";
                        break;
                    default:
                        errorMessage = "An unknown error occurred";
                }
                this.setState({error: errorMessage});
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        this.setState({error: "Geolocation not supported"});
    }
}
```

### Update Initial State

```javascript
state = {
    language: "en",
    location: "Vancouver, CA",
    weather : {},
    error: null,  // Add error state
    dispatch: action => {
        this.setState(state => reducer(state, action));
    }
}
```

## Acceptance Criteria

- [ ] `loadWeather` function returns the Promise
- [ ] Error handling added to `loadWeather`
- [ ] Geolocation error callback implemented
- [ ] HTTP response status checked before parsing
- [ ] API error responses validated
- [ ] Error state added to Context
- [ ] User-friendly error messages
- [ ] Test with denied geolocation permission
- [ ] Test with invalid coordinates
- [ ] Test with network offline

## Test Cases

1. Deny geolocation permission → Should show appropriate error
2. Call loadWeather with invalid city → Should handle error
3. Disconnect network and load → Should show network error
4. Invalid API key → Should show authentication error

## Related Issues

- Related to issue #2 (App.js also needs error handling)
- Dependent on issue #1 (API key must be valid)
- Related to issue #11 (loadWeather return value)

## References

- [MDN - Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [MDN - Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
