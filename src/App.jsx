import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MobilDescriptions from "./Pages/MobilDescriptions";
import Cart from "./Pages/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/description/:id" element={<MobilDescriptions />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
