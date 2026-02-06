**Title:** 📝 Add .env.example File

**Labels:** `documentation`, `enhancement`, `good first issue`

---

## Description
No `.env.example` file exists to guide developers on required environment variables.

## Create .env.example
```env
# OpenWeatherMap API Key
# Get your key from: https://openweathermap.org/api
REACT_APP_OPENWEATHER_KEY=your_api_key_here
```

## Update README.md
Add setup instructions:
```markdown
## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Add your OpenWeatherMap API key to `.env`
5. Run: `npm start`
```

## Acceptance Criteria
- [ ] Create `.env.example` file
- [ ] Update README with setup instructions
- [ ] Document where to get API key
