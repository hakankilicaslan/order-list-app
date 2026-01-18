import { useState } from "react";

const UseStateObject = () => {
  const [person, setPerson] = useState({
    name: "Hakan",
    age: 32,
    text: "Hello",
  });

  const changeText = () => {
    // Sadece state içinde text alanını değiştirmek istediğimiz için önce spread operatörüyle nesneyi yayıyoruz sonra değiştirmek istediğimiz text alanını değiştiriyoruz.
    setPerson({ ...person, text: "Hello World" });
  };

  return (
    <>
      <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h3>{person.text}</h3>
      <button onClick={changeText}>Metni Değiştir</button>
    </>
  );
};

export default UseStateObject;
