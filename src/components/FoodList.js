import FoodShow from "./FoodShow";

// App üzerinden gelen props nesnesindeki foods listesini mapleyerek FoodShow bileşenine iletiyoruz.
// Diziyi mapleyerek return kısmında her elemanı için FoodShow bileşenine props olarak ilettik ve renderedFoods değişkenine attık.
// Bir değişkene atıp onu return kısmında döndük ama direkt FoodList return kısmında mapleyip FoodShow bileşenine gönderebilirdik.
// Parent olan App üzerinden gelen onDelete ve onEdit fonksiyonlarını da props olarak alıp FoodShow props olarak iletiyorduk.
// Artık useContext kullandığımız için burada hiç kullanılmayan iki fonksiyonu çıkardık FoodShow içinde context üzerinden alacağız.
const FoodList = ({ foods }) => {
  const renderedFoods = foods.map((food) => {
    return <FoodShow key={food.id} food={food} />;
  });

  return <div className="food-list">{renderedFoods}</div>;
};

export default FoodList;
