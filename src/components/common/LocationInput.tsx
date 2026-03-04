import { useState } from "react";

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


    const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validation
        if(!input.trim()){
            setError('Please enter a location');
            return;
        }

        if(input.length > 50){
            setError('Location name is too long');
            return;
        }


        setError('');
        onSearch(input.trim());
        setInput('');
    }


  return (
  <form onSubmit={handleSearch} className="flex flex-col gap-2">
    <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(''); // Clear error when typing
          }}
          placeholder={placeholder}
          disabled={isLoading}
          maxLength={50}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
  </form>);
};

export default LocationInput;
