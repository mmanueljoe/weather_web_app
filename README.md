# Weather Web App

A simple, responsive weather application built with React, TypeScript, Vite, and Tailwind CSS.

The app lets users search for a location and view:
- current weather conditions
- a 24-hour forecast
- common weather details like humidity, wind speed, rain probability, and "feels like" temperature

Weather data is fetched from the Visual Crossing Weather API and managed globally with React Context.

## What This Project Does

This app is designed as a clean frontend project that demonstrates:
- asynchronous API data fetching
- centralized state management with context + hooks
- typed API data transformation
- reusable component design
- user-friendly error and loading states
- basic accessibility improvements (input labeling, ARIA error binding, improved focus states, and color contrast updates)

## Tech Stack

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 4
- ESLint 9

## Project Structure

```text
src/
  components/
    common/
      ErrorMessage.tsx
      LoadingSpinner.tsx
      LocationInput.tsx
      WeatherIcon.tsx
    features/
      current-weather/
        CurrentWeatherCard.tsx
      forecast/
        ForecastCard.tsx
        ForecastList.tsx
    MainContent.tsx
  context/
    WeatherContext.ts
    WeatherProvider.tsx
    types.ts
    index.ts
  hooks/
    useWeather.ts
    useLocation.ts
  services/
    weatherService.ts
  types/
    apiResponse.ts
  App.tsx
  main.tsx
```

## Setup

### 1. Install dependencies

If you use pnpm:

```bash
pnpm install
```

If you use npm:

```bash
npm install
```

### 2. Add environment variables

Create a `.env.local` file in the project root and add:

```env
VITE_API_KEY=your_visual_crossing_api_key
```

Important:
- The app reads `import.meta.env.VITE_API_KEY`.
- If the key is missing, the UI will show: `API key not found`.
- Restart the dev server after changing `.env.local`.

### 3. Run the app

```bash
pnpm dev
```

or

```bash
npm run dev
```

## Available Scripts

- `pnpm dev` / `npm run dev`: start local dev server
- `pnpm build` / `npm run build`: type-check and build for production
- `pnpm lint` / `npm run lint`: run ESLint
- `pnpm preview` / `npm run preview`: preview production build locally

## How Data Flows Through the App

1. `LocationInput` collects a city name.
2. `MainContent` calls `searchLocation` from the weather context.
3. `WeatherProvider` invokes `fetchWeather` in `weatherService.ts`.
4. API response is transformed into local app types.
5. Context state updates (`currentWeather`, `hourlyForecast`, `loading`, `error`).
6. UI re-renders and displays cards/lists accordingly.

## Context and Hooks

### `WeatherProvider`

Holds global weather state:
- `currentWeather`
- `hourlyForecast`
- `loading`
- `error`
- `selectedLocation`

Exposes actions:
- `searchLocation(location)`
- `refreshWeather()`
- `clearError()`

### `useWeather`

A custom hook that reads from `WeatherContext` and throws a clear error if used outside `<WeatherProvider>`.

### `useLocation`

An additional hook for storing up to 10 unique recent location searches in memory. It is currently available but not wired into the main UI.

## API Integration

The app uses Visual Crossing Timeline API:

- Base URL:
  - `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`
- Request includes:
  - location
  - API key
  - `include=current,hours`
  - `units=metric`

Response data is transformed into:
- `WeatherData`
- `HourlyForecast[]`

This keeps UI components independent from raw API response shape.

## Error Handling

User-facing messages are provided for:
- empty location input
- missing API key
- invalid API key (`401`)
- unknown location (`404`)
- rate limit (`429`)
- generic API failures

Validation exists both in the input component and in the service layer.

## Accessibility Notes

Recent updates include:
- improved color contrast for key text/background pairs
- accessible input labeling (`label` + `id`)
- `aria-invalid` and `aria-describedby` on the input
- error announcement with `role="alert"`
- visible keyboard focus states for input and button
- state-specific button styles (default, hover, disabled)

## Design Notes

The UI uses a blue gradient visual style with white and blue-tinted text, plus white forecast cards for readability.

Main states covered:
- initial empty state
- loading state
- error state
- current weather state
- forecast state

## Known Limitations and Suggested Improvements

- Search is manual only (no geolocation or autocomplete).
- No persistence for recent searches (refresh clears memory).
- No unit toggle (currently metric only).
- Forecast is rendered from the first day’s hourly data only.
- A small service cleanup is still recommended: avoid adding the API key twice in the request URL query string.

## Troubleshooting

### "API key not found"

- Ensure `.env.local` contains `VITE_API_KEY=...`.
- Confirm you did not use a different name like `VITE_REACT_APP_WEATHER_API_KEY`.
- Restart the dev server.

### Hook usage error (`useWeather must be used within a <WeatherProvider>`)

- Ensure app content is wrapped with `<WeatherProvider>` in `App.tsx`.

### Build or lint issues

- Run:

```bash
pnpm lint
pnpm build
```

- Fix reported TypeScript/ESLint errors before deployment.

## License

No license file is currently defined in this repository.
