import { useId, useState } from "react";

interface LocationInputProps {
  onSearch: (location: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const LocationInput = ({
  onSearch,
  isLoading = false,
  placeholder = "Enter a city name...",
}: LocationInputProps) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputId = useId();
  const errorId = useId();

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation
    if (!input.trim()) {
      setError("Please enter a location");
      return;
    }

    if (input.length > 50) {
      setError("Location name is too long");
      return;
    }

    setError("");
    onSearch(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-2">
      <label htmlFor={inputId} className="sr-only">
        Search location
      </label>
      <div className="flex gap-2">
        <input
          id={inputId}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(""); // Clear error when typing
          }}
          placeholder={placeholder}
          disabled={isLoading}
          maxLength={50}
          autoComplete="address-level2"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 placeholder:text-gray-400 transition-colors text-gray-200"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-2 bg-blue-700 text-white rounded-lg enabled:hover:bg-blue-800 disabled:bg-blue-900 disabled:text-blue-100 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-100 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-white bg-red-700/90 px-3 py-1 rounded-md font-medium"
        >
          {error}
        </p>
      )}
    </form>
  );
};

export default LocationInput;
