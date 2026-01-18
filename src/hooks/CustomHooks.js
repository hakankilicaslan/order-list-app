import { useFetch } from "./UseFetch";

const url = "https://fakestoreapi.com/products";

// useFetch isminde bir hook oluşturduk ve verilen url için istek atıp data dönüyor.
const CustomHooks = () => {
  const {loading, products} = useFetch(url);

  return (
    <div>
      <h2>{loading ? "Loading..." : products}</h2>
    </div>
  );
};

export default CustomHooks;
