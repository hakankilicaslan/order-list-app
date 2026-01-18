import { useState } from "react";

// return içinde süslü parantez içine if koşulu yazamayız if koşula göre bir şey döneceği için bunu kullanamıyoruz sadece ternary kullanarak şartlı return yapabiliriz.
const ShortCircuit = () => {
  const [isError, setIsError] = useState(false);

  return (
    <>
      <button onClick={() => setIsError((pre) => !pre)}>Toogle Error</button>
      {isError && <h1>Error...</h1>}
      {isError ? <p>Hata var...</p> : <div><h2>Hata yok</h2></div>}
    </>
  );
};

export default ShortCircuit;
