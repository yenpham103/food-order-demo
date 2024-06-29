import PropTypes from "prop-types";
export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-green-500 hover:bg-green-700 select-none text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node,
};
