import { SERVER_API } from "../api";

export const getApiKey = async (email) => {
  const response = await fetch(`${SERVER_API}/api-key?email=${email}`);
  if (!response.ok) {
    throw new Error("Failed to fetch API key");
  }
  const data = await response.json();
  const { apiKey } = data.data;
  return apiKey;
};
export const getProducts = async (apiKey, page = 1, limit = 8) => {
  const response = await fetch(
    `${SERVER_API}/products?page=${page}&limit=${limit}`,
    {
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product list");
  }
  const data = await response.json();
  const products = data.data.listProduct;
  return products;
};
export const getProfile = async (apiKey) => {
  const response = await fetch(`${SERVER_API}/users/profile`, {
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  const data = await response.json();
  const name = data.data.emailId.name;
  return name;
};

export const getOrders = async (apiKey, products) => {
  const body = products.map((product) => ({
    productId: product._id,
    quantity: product.quantity,
  }));
  const response = await fetch(`${SERVER_API}/orders`, {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await response.json();
  console.log(data);
  const orders = data.data.orders;
  return orders;
};
