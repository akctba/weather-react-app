**Title:** 🔧 Language Selector Not Integrated with Weather API

**Labels:** `enhancement`, `feature`

---

## Description
The LanguageCombo component is rendered but the selected language doesn't affect the weather API calls.

## Current State
- Language selector exists and displays
- Selection doesn't update any state
- Weather API is not called with `lang` parameter

## Recommended Solution
```javascript
const [language, setLanguage] = useState('en');

const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
};

// Pass to LanguageCombo
<LanguageCombo default={language} onChange={handleLanguageChange} />

// Use in API call
fetch(`${api.base}weather?q=${query}&units=metric&lang=${language}&APPID=${api.key}`)
```

## Acceptance Criteria
- [ ] Add language state management
- [ ] Connect language selector to state
- [ ] Pass language parameter to API calls
- [ ] Test with different languages
- [ ] Weather descriptions appear in selected language
