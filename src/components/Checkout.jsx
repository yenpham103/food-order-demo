import { useContext, useState } from "react";
import { currencyFormatter } from "../utils/formatting";
import CartContext from "../store/CartContext";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { getOrders } from "../libs/shopServer";
import { showToast } from "../libs/toast";
import { ToastContainer } from "react-toastify";
export default function Checkout() {
  const apiKey = JSON.parse(localStorage.getItem("apiKey"));
  const [loading, setLoading] = useState(false);
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const navigation = useNavigate();
  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await getOrders(apiKey, cartCtx.items);
      showToast("Đặt hàng thành công !", "success");
      setTimeout(() => {
        navigation("/done");
      }, 3000);
    } catch (error) {
      showToast("Đặt hàng thất bại !", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmitOrder}
      >
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <p className="mb-4 text-xl font-medium">
          Total Amount: {currencyFormatter.format(cartTotal)}
        </p>

        <Input label="Full Name" type="text" id="fullName" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <Input label="City" type="text" id="city" />
          </div>
          <div className="w-1/2 ml-2">
            <Input label="Phone" type="text" id="phone" />
          </div>
        </div>

        <div className="flex justify-end">
          <Link to={"/modal"}>
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
            >
              Edit Order
            </button>
          </Link>
          <button
            type="submit"
            onClick={(e) => handleSubmitOrder(e)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            {loading ? "Submitting..." : "Submit Order"}
          </button>
        </div>
        <ToastContainer />
      </form>
    </>
  );
}
