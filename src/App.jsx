import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./Pages/HomePage"
import { ToastBar } from "react-hot-toast"


function App() {

  return (
    

        <Routes>
          <Route path="/" element={<HomePage/>}  />
          
        </Routes>

  )
}

export default App
