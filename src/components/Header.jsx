import { useContext } from "react";
import Button from "./Button";
import CartContext from "../store/CartContext";
import { Link } from "react-router-dom";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="font-bold text-white text-2xl">Welcome to ShopPage</h1>
      <Link to={"/modal"}>
        <Button disabled={totalCartItems === 0}>
          Cart ({totalCartItems ? totalCartItems : 0})
        </Button>
      </Link>
    </div>
  );
}
