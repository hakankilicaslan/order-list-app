import { useState, useContext } from "react";
import FoodEdit from "./FoodEdit";
import { FoodContext } from "./App";

const FoodShow = ({ food }) => {
  // Önceden FoodList üzerinden aldığımız iki fonksiyonu artık useContext diyerek nesneyi parçalayıp direkt aynı ismi verdik ve kullanabiliyoruz.
  const { deleteFoodById, editFoodById } = useContext(FoodContext);
  const [showEdit, setShowEdit] = useState(false);

  // Delete butonuna tıklayarak contextten aldığımız deleteFoodById ile App bileşenindeki deleteFoodById tetikleniyor ve listeden eleman çıkarılıyor.
  const handleDeleteClick = () => deleteFoodById(food.id);

  // Edit butonuna tıklayarak showEdit state önceki halinin diğerine yani false ise true olarak setleniyor.
  const handleEditClick = () => setShowEdit((pre) => !pre);

  // Save işlemi yapıldıktan sonra showEdit state false yapılıyor ve FoodEdit bileşeninin kapatılması sağlanıyor.
  const handleSubmit = (id, newTitle) => {
    setShowEdit(false);
    editFoodById(id, newTitle); // Submit durumunda edit state false yapılırken beraberinde contextten aldığımız editFoodById tetikleniyor.
  };

  // İşlemler aynı anda olduğu için onSubmit ile handleSubmit fonksiyonu tetiklenip state false yapılırken editFoodById tetikliyoruz.
  // showEdit state ile FoodEdit yönetiliyor tıklanıp true olursa FoodEdit açılıyor false olursa sadece title gösteriliyor.
  let content = showEdit ? <FoodEdit food={food} onSubmit={handleSubmit} /> : <h3>{food.title}</h3>;

  return (
    <div className="food-show">
      <div
        className="food-background"
        style={{backgroundImage: `url(https://picsum.photos/seed/${food.id}/300/200)`}}
      ></div>
      <div className="food-content">{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default FoodShow;
