import { useState } from "react";

const UseStateBasic = () => {
  const [text, setText] = useState("Kılıç");

  // Buton tıklandığında setText() fonksiyonu işleme alınıp text değiştirildiğinde sayfa rerender edilir ve kod baştan yeniden okunur.
  // setText("Aslan") olduğunda React state güncellemesi olduğu için bütün kodu yeniden tarar ve text olan yerleri Aslan olarak değiştirir.
  const handleClick = () => {
    if (text === "Kılıç") {
      setText("Aslan");
    } else {
      setText("Kılıç");
    }
  };

  return (
    <>
      <h1>{text}</h1>
      <button onClick={handleClick}>Başlığı değiştir</button>
    </>
  );
};

export default UseStateBasic;
