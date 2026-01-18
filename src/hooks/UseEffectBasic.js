import { useEffect, useState } from "react";

const UseEffectBasic = () => {
  const [value, setValue] = useState(0);

  // Sayfa her render edildiğinde useEffect de beraberinde render edilir ama sayfa okunduktan sonra en son useEffect çalıştırılır.
  // value değeri için state güncellendiğinde sayfa tekrar render edilince önce dışardaki konsol sonra useEffect içindeki konsol yazılır.
  // React önce sayfayı tarar işler en son useEffect işlenir ve içindeki kodlar uygulanır ama useEffect içine şart verilerek bu engellenebilir.
  // useEffect içine fonksiyon sonrası bir array vererek bu koşula bakılarak sayfa rerender edildiğinde çalışıp çalışmayacağını belirleyebiliriz.
  // Eğer boş array verirsek sayfa ilk açıldığında useEffect çalıştırılır ama state güncellemesi olduğunda tekrar çalıştırılmaz.
  // Aşağıda dizi içine value verdik ve useEffect value state güncellendiğinde rerender durumunda çalışsın demiş oluyoruz.
  // Dizi içine başka stateler verirsek React onların herhangi birinde değişiklik olduğunda useEffect tekrar çalıştıracaktır.
  // Fonksiyon sonrası bir bağımlılık vermiş oluyoruz yani vermezsek her renderda boş dizide sadece ilk açıldığında içine değer verdiğimizde onun değişiminde çalışacak.
  useEffect(() => {
    console.log("useEffect çağrıldı");
    if (value > 0) {
      document.title = `Yeni mesaj(${value})`;
    }
  }, [value]);

  console.log("Bileşen render edildi");
  return (
    <>
      <h1>{value}</h1>
      <button onClick={() => setValue((pre) => pre + 1)}>Tıklayın</button>
    </>
  );
};

export default UseEffectBasic;
