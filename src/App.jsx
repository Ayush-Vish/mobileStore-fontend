import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./Pages/HomePage"
import { ToastBar } from "react-hot-toast"
import MobilDescriptions from "./Pages/MobilDescriptions"


function App() {

  return (
    

        <Routes>
          <Route path="/" element={<HomePage/>}  />
          <Route path="/description/:id" element={<MobilDescriptions/>}  />
        </Routes>

  )
}

export default App
