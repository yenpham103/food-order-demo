import PropTypes from "prop-types";
import Button from "./Button";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { showToast } from "../libs/toast";
function CartItem({ products }) {
  const cartCtx = useContext(CartContext);
  const handleAddToCart = () => {
    cartCtx.addItem(products);
    showToast("Thêm vào giỏ hàng thành công !", "success");
  };
  return (
    <div className="box p-4 shadow-lg bg-white rounded-lg relative">
      <div>
        <img
          src={products.image}
          alt={products.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <h2 className="text-xl font-normal mt-2">{products.name}</h2>
      </div>
      <div className="flex justify-between items-center">
        <span>{products.price}</span>
        <Button onClick={handleAddToCart}>Add to cart</Button>
      </div>
    </div>
  );
}
CartItem.propTypes = {
  products: PropTypes.object,
};
export default CartItem;
