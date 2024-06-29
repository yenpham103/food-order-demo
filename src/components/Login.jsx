import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getApiKey } from "../libs/shopServer";
import { ToastContainer } from "react-toastify";
import { showToast } from "../libs/toast";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [form, setForm] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage("apiKey", null);
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey) {
      setLoading(true);
      try {
        const token = await getApiKey(form.email);
        if (token) {
          setApiKey(token);
          showToast("Đăng nhập thành công !", "success");
        }
      } catch (error) {
        showToast("Vui lòng nhập đúng email !", "error");
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (apiKey) {
      navigation("/shop");
    }
  }, [apiKey, navigation]);
  const handleChangeValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };
  return (
    <div className="w-screen h-screen bg-slate-300 fixed inset-0 flex items-center justify-center">
      <form
        action=""
        className="bg-white p-6 rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="example@example.com"
          onChange={handleChangeValue}
        />
        <button
          type="submit"
          className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
