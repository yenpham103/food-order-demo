import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting.js";
import { Link, useNavigate } from "react-router-dom";
import ModalItem from "./ModalItem.jsx";
import { showToast } from "../libs/toast.js";
import { ToastContainer } from "react-toastify";

export default function Modal() {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  if (cartCtx.items.length === 0) {
    navigate("/shop");
  }
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-300 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cartCtx.items.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cartCtx.items.map((item) => (
                <ModalItem
                  key={item._id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  onIncrease={() => {
                    cartCtx.addItem(item);
                    showToast("Thêm sản phẩm thành công !", "success");
                  }}
                  onDecrease={() => {
                    cartCtx.removeItem(item._id);
                    showToast("Xóa sản phẩm thành công !", "warning");
                  }}
                />
              ))}
            </ul>
            <p className="text-lg font-bold mt-4">
              Total: {currencyFormatter.format(cartTotal)}
            </p>
            <div className="mt-4 flex justify-end">
              <Link to="/shop">
                <button className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md">
                  Close
                </button>
              </Link>
              <Link to="/checkout">
                <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md">
                  Go to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
