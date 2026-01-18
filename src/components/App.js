import { useEffect, useState, createContext } from "react";
import FoodCreate from "./FoodCreate";
import FoodList from "./FoodList";
import axios from "axios";

export const FoodContext = createContext(); // createContext nesnemizi oluşturup FoodContext değişkenimize atadık ve Provider ile return içinde saracağız.

const App = () => {
  const [foods, setFoods] = useState([]);

  // JSON server kullanarak oluşturduğumuz db.json içindeki foods listesini axios ile get isteği atarak getiriyoruz ve foods state'ine setliyoruz.
  const fetchFoods = async () => {
    const response = await axios.get("http://localhost:3001/foods");
    setFoods(response.data);
  };

  // useEffect ile ilk açıldığında fetchFoods fonksiyonunu tetikliyoruz ve ekrana db.json içindeki datalarımızı getiriyoruz.
  useEffect(() => {
    fetchFoods();
  }, []);

  // FoodCreate componentinden gelen title ile yeni bir nesne oluşturup foods dizisini spread ediyoruz ve sonuna nesneyi ekleyerek yeni bir dizi oluşturuyoruz.
  // Yeni bir referans göstererek state içinde setleme yapıyoruz ve React burada değişiklik yapıldığını gördüğü için rerender ediyor ve foods güncelleniyor.
  // Aynı dizi yani foods sonuna push ile ekleseydik burada referans aynı, mevcut dizi sonuna eklendiği için React state içinde setleme işlemi yapmıyor.
  // useState kullanımında sadece referans değişirse yeni bir array setlenirse farklılık olduğunu görüp güncelleme işlemini yapıyor.
  // Dizi üzerinde mapleme işlemi yaptığımızda key istediği için ve id olarak da birbirinden farklı id vermek istediğimiz için crypto.randomUUID diyerek eşşiz id atadık.

  /*
  const createFood = (title) => {
    const updatedFoods = [...foods, { id: crypto.randomUUID(), title }]; // Eklenecek nesne içine title: title yerine aynı isim olduğu için title verebiliriz.
    setFoods(updatedFoods);
  };
  */

  // Yukarıdakinin yerine artık axios ile post isteği atarak listemize yeni bir nesne ekliyoruz ve eklediğimiz nesneyi foods state'ine de ekleyerek ekrana basıyoruz.
  // Artık db.json dosyasında girdiğimiz title değeri yeni bir id verilerek set edilmiş olmalı burada id değerini kendisi string olarak veriyor biz vermiyoruz.
  const createFood = async (title) => {
    const response = await axios.post("http://localhost:3001/foods", { title });
    const updatedFoods = [...foods, response.data];
    setFoods(updatedFoods);
  };

  // Silme durumunda bu fonksiyonu silinmek istenen id ile tetikliyoruz ve o id ile eşit olmayanları filtreleyerek o nesneyi dizimizden çıkarmış oluyoruz.
  // Fonksiyonu App içinde props olarak FoodList bileşenine orada da hiçbir işlem yapmadan FoodShow bileşenini aktarmamız gerekiyor.
  // FoodList bileşeni bizim için gereksiz bir adım oldu onun yerine useContext ile aradaki yolları kaldırıp FoodShow içinden App içindeki fonksiyonu tetikleyeceğiz.

  /*
  const deleteFoodById = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };
  */

  // Yukarıdakinin yerine artık axios ile delete isteği atarak listemizden ilgili nesneyi çıkarıyoruz ve foods state'ini de filter ile ilgili nesneyi çıkarıp setliyoruz.
  const deleteFoodById = async (id) => {
    await axios.delete(`http://localhost:3001/foods/${id}`);
    setFoods(foods.filter((food) => food.id !== id));
  };

  // FoodEdit bileşeninde düzenleme yaparken ilgili nesnenin id değeri ve yeni bir title ile bu fonksiyonu tetikliyoruz ve ilgili nesneni title güncelleniyor.
  // Dizimiz üzerinde map ile yineleme yaparak id ile ilgili nesneyi bulup title değiştiriyoruz diğer elemanlara hiçbir işlem yapmadan updateFoods içine ekliyoruz.

  /*
  const editFoodById = (id, newTitle) => {
    const updatedFoods = foods.map((food) => {
      if (food.id === id) {
        return { ...food, title: newTitle };
      }
      return food;
    });

    setFoods(updatedFoods);
  };
  */

  // Yukarıdakinin yerine artık axios ile put isteği atarak listemizden ilgili nesneyi bulup yeni gönderilen title değerini setlemiş oluyoruz ve foods mapleme yapılarak ilgili nesneyi güncelleyip setliyoruz.
  const editFoodById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/foods/${id}`, {
      title: newTitle,
    });

    const updatedFoods = foods.map((food) => {
      return food.id === id ? { ...food, ...response.data } : food;
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
