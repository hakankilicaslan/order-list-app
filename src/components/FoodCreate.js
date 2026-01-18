import { useState } from "react";

const FoodCreate = ({ onCreate }) => {
  const [title, setTitle] = useState("");

  // onCreate içine state üzerinde yönettiğimiz title iletiliyor ve App componentine kullanıcının input içine girdiği değeri submit durumunda iletmiş oluyoruz.
  // Kullanıcı formu submit ettiğinde butona tıkladığında parent olan componente title ile değeri iletiyoruz ve inputu temizlemek için setTitle('') ile state boşaltılıyor.
  const handleSubmit = (e) => {
    e.preventDefault(); // Submit durumunda sayfaya refresh atan varsayılan davranışı engellemiş oluyoruz.
    onCreate(title);
    setTitle("");
  };

  return (
    <div className="food-create">
      <h3>Sipariş Listesi</h3>
      <form onSubmit={handleSubmit}>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className="button">Submit</button>
      </form>
    </div>
  );
};

export default FoodCreate;
