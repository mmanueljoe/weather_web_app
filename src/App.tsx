import { WeatherProvider } from "@/context";
import { MainContent } from '@/components/MainContent'

function App() {


  return (
  <WeatherProvider>
    <MainContent />
  </WeatherProvider>
   
  )
}

export default App
