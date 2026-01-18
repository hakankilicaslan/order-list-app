import { useEffect, useState } from "react";

// Gelen url ile fetch ederek dataları çekiyoruz ve state setliyoruz sonra return kısmında nesne içinde dönüyoruz.
// Bu şekilde verilen her url için istek atan bir hook yapmış olduk.
export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch(url);
    const products = await response.json();
    setProducts(products);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [url]);

  return {loading,products}
}