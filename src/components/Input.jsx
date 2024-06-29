export default function Input({ label, id, ...props }) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-bold text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
        required
        {...props}
      />
    </div>
  );
}
