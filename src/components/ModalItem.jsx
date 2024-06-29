import { currencyFormatter } from "../utils/formatting";
import PropTypes from "prop-types";
export default function ModalItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  return (
    <li className="flex justify-between items-center py-4 border-b border-gray-200">
      <div className="flex-1">
        <p className="text-lg">
          {name} - {currencyFormatter.format(price)}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onDecrease}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded focus:outline-none"
        >
          -
        </button>
        <span className="px-3 py-1 bg-gray-100 text-gray-700">{quantity}</span>
        <button
          onClick={onIncrease}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded focus:outline-none"
        >
          +
        </button>
      </div>
    </li>
  );
}

ModalItem.propTypes = {
  name: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
};
