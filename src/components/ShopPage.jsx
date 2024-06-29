import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../libs/shopServer";
import { getProfile } from "../libs/shopServer";
import CartItem from "./CartItem";
import { showToast } from "../libs/toast";
import { ToastContainer } from "react-toastify";
import Loading from "./Loading";
import Header from "./Header";
export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const token = localStorage.getItem("apiKey");
  const apiKey = JSON.parse(token);

  useEffect(() => {
    if (!apiKey) {
      navigation("/login");
    }
  }, [apiKey, navigation]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (apiKey) {
          const products = await getProducts(apiKey);
          setProducts(Array.isArray(products) ? products : []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiKey]);
  useEffect(() => {
    const fetchProfile = async () => {
      if (apiKey) {
        const profile = await getProfile(apiKey);
        showToast(`Hello, ${profile}`, "success");
      }
    };
    fetchProfile();
  }, [apiKey]);
  return (
    <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center ">
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-8">
          {products.map((product, index) => (
            <CartItem key={index} products={product} />
          ))}
          <ToastContainer />
        </div>
      )}
    </div>
  );
}
