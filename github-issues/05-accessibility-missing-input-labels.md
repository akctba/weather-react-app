**Title:** ♿ ACCESSIBILITY: Missing Label for Search Input

**Labels:** `accessibility`, `enhancement`, `good first issue`

---

## Description

The search input in `App.js` lacks an associated label element, making it difficult for screen reader users to understand its purpose. This violates WCAG 2.1 accessibility guidelines.

## Current Code

**File:** `src/App.js` (Lines 47-53)

```javascript
<input type="text"
    className="search-bar"
    placeholder="Search..."
    onChange={e => setQuery(e.target.value)}
    value={query}
    onKeyPress={search}
/>
```

## Problems

- ❌ No `<label>` element associated with the input
- ❌ Placeholder alone is not sufficient for accessibility
- ❌ Screen readers may not announce the input's purpose clearly

## Impact

- Poor accessibility for visually impaired users
- Fails WCAG 2.1 Level A compliance (1.3.1 Info and Relationships)
- Difficult for users relying on assistive technologies

## Recommended Solution

### Option 1: Visible Label

```javascript
<div className="search-box">
    <label htmlFor="weather-search" className="search-label">
        Search for a city
    </label>
    <input 
        id="weather-search"
        type="text"
        className="search-bar"
        placeholder="Enter city name..."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        aria-describedby="search-hint"
    />
    <span id="search-hint" className="sr-only">
        Press Enter to search
    </span>
</div>
```

### Option 2: Visually Hidden Label (maintains current design)

```javascript
<div className="search-box">
    <label htmlFor="weather-search" className="sr-only">
        Search for city weather
    </label>
    <input 
        id="weather-search"
        type="text"
        className="search-bar"
        placeholder="Search..."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        aria-label="Search for city weather"
    />
</div>
```

### Add CSS for Screen Reader Only Content

```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
```

## Acceptance Criteria

- [ ] Add `<label>` element for search input
- [ ] Associate label with input using `htmlFor` and `id`
- [ ] Add `aria-label` or visible label text
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Ensure visual design is maintained
- [ ] Add `.sr-only` utility class if using hidden label

## Testing

Test with:
- NVDA (Windows) - Free
- JAWS (Windows) - Trial available
- VoiceOver (macOS/iOS) - Built-in
- Chrome/Edge DevTools Accessibility Inspector

## References

- [WCAG 2.1 - Labels or Instructions](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html)
- [MDN - aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
- [WebAIM - Creating Accessible Forms](https://webaim.org/techniques/forms/)
