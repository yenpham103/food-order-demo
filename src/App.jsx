import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import ShopPage from "./components/ShopPage";
import Login from "./components/Login";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Modal from "./components/Modal";
import Checkout from "./components/Checkout";
import Done from "./components/Done";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <main className="flex items-center justify-center p-8 w-full h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/done" element={<Done />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </main>
  );
}

const AppWrapper = () => (
  <UserProgressContextProvider>
    <CartContextProvider>
      <Router>
        <App />
      </Router>
    </CartContextProvider>
  </UserProgressContextProvider>
);

export default AppWrapper;
