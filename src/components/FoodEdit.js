import { useState } from "react";

const FoodEdit = ({ food, onSubmit }) => {
  const [title, setTitle] = useState(food.title);

  // Save butonu tıklanıp submit edildiğinde handleSubmit tetikleniyor ve props içinde gelen onSubmit fonksiyonunu da tetikliyoruz.
  // FoodShow içindeki state false yapılarak edit kapatılıyor ve oradaki editFoodById fonksiyonuna id ve yeni title göndererek tetikliyoruz.
  // Önceden onSubmit gibi editFoodById props olarak geliyordu ve aynı anda tetikleniyordu artık FoodShow içindeki handleSubmit içinde tetikliyoruz.
  const handleSubmit = (e) => {
    e.preventDefault();
    // editFoodById(food.id, title); 
    onSubmit(food.id, title);
  };

  return (
    <form className="food-edit" onSubmit={handleSubmit}>
      <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button className="button">Save</button>
    </form>
  );
};

export default FoodEdit;
