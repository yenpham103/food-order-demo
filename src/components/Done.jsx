import { ToastContainer } from "react-toastify";
import { showToast } from "../libs/toast";
import { useContext, useState } from "react";
import CartContext from "../store/CartContext";
import { useNavigate } from "react-router-dom";
const Done = () => {
  const [tks, setTks] = useState(false);
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();

  const handleGoToShop = () => {
    setTks(true);
    cartCtx.clearCart();
    showToast("Cảm ơn bạn đã đặt hàng", "success");
    setTimeout(() => {
      navigate("/shop");
    }, 1000);
  };
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="text-lg mb-4">Your order has been placed successfully.</p>
        <button
          onClick={handleGoToShop}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          {tks ? "Cảm ơn quý khách" : "Okay"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Done;
