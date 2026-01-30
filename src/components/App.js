import { useEffect, useState, createContext } from "react";
import FoodCreate from "./FoodCreate";
import FoodList from "./FoodList";
import axios from "axios";

export const FoodContext = createContext(); // createContext nesnemizi oluşturup FoodContext değişkenimize atadık ve Provider ile return içinde saracağız.

const App = () => {
  const [foods, setFoods] = useState([]);

  // FoodCreate componentinden gelen title ile yeni bir nesne oluşturup foods dizisini spread ediyoruz ve sonuna nesneyi ekleyerek yeni bir dizi oluşturuyoruz.
  // Yeni bir referans göstererek state içinde setleme yapıyoruz ve React burada değişiklik yapıldığını gördüğü için rerender ediyor ve foods güncelleniyor.
  // Aynı dizi yani foods sonuna push ile ekleseydik burada referans aynı, mevcut dizi sonuna eklendiği için React state içinde setleme işlemi yapmıyor.
  // useState kullanımında sadece referans değişirse yeni bir array setlenirse farklılık olduğunu görüp güncelleme işlemini yapıyor.
  // Dizi üzerinde mapleme işlemi yaptığımızda key istediği için ve id olarak da birbirinden farklı id vermek istediğimiz için crypto.randomUUID diyerek eşşiz id atadık.

  const createFood = (title) => {
    const updatedFoods = [...foods, { id: crypto.randomUUID(), title }]; // Eklenecek nesne içine title: title yerine aynı isim olduğu için title verebiliriz.
    setFoods(updatedFoods);
  };

  // Silme durumunda bu fonksiyonu silinmek istenen id ile tetikliyoruz ve o id ile eşit olmayanları filtreleyerek o nesneyi dizimizden çıkarmış oluyoruz.
  // Fonksiyonu App içinde props olarak FoodList bileşenine orada da hiçbir işlem yapmadan FoodShow bileşenini aktarmamız gerekiyor.
  // FoodList bileşeni bizim için gereksiz bir adım oldu onun yerine useContext ile aradaki yolları kaldırıp FoodShow içinden App içindeki fonksiyonu tetikleyeceğiz.

  const deleteFoodById = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  // FoodEdit bileşeninde düzenleme yaparken ilgili nesnenin id değeri ve yeni bir title ile bu fonksiyonu tetikliyoruz ve ilgili nesneni title güncelleniyor.
  // Dizimiz üzerinde map ile yineleme yaparak id ile ilgili nesneyi bulup title değiştiriyoruz diğer elemanlara hiçbir işlem yapmadan updateFoods içine ekliyoruz.

  const editFoodById = (id, newTitle) => {
    const updatedFoods = foods.map((food) => {
      if (food.id === id) {
        return { ...food, title: newTitle };
      }
      return food;
    });

    setFoods(updatedFoods);
  };

  // FoodContext.Provider ile App bileşeninin children'larını sarıyoruz ve prop drillinge neden olan iki fonksiyonu artık value içine setliyoruz.
  // bu şekilde ihtiyacı olan bileşenler useContext diyerek fonksiyonları direkt çağırabilecek ve aradakilerle props olarak aktarmaya gerek kalmayacak.
  return (
    <FoodContext.Provider value={{ deleteFoodById, editFoodById }}>
      <div className="app">
        <FoodCreate onCreate={createFood} />
        <FoodList foods={foods} />
      </div>
    </FoodContext.Provider>
  );
};

export default App;
