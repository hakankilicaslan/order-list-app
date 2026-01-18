import { useState } from "react";

// UseStateCounter bir ana kapsayıcı(parent) olur ve içinde başka bir <Child/> component var diyelim state değişikliği olduğunda child olan component da rerender edilir.
// React değişiklik olup olmadığına bakmadan kendini güvenceye almak için alt componentleri bir props iletilmese bile rerender ediyor.
// React memo ile rerender durumunda child componentine props iletilmiyorsa ya da bir değişiklik olma ihtimali olmadığı durumda tekrar rerender etme demiş oluyoruz.
const UseStateCounter = () => {
  const [value, setValue] = useState(0);

  // handleUpdate içinde birden fazla state setleme işlemi yapılmakta ama React aynı fonksiyon içinde olduğu için stateleri güncelleyip tek rerenderda hepsini uygular.
  const handleUpdate = () => {
    setValue(value + 1); // 1
    setValue(value + 10); // 10
    // Başta sadece yukarıdaki ilk iki setValue olduğunu varsayarsak ikisi de value olarak 0 alır ve ikincisi uygulanır ve value 10 olarak setlenir.
    // Bunun önüne geçmek için önceki versiyonunu almasını sağlayıp callback yapacağız yani state içinde ne varsa onu p olarak alıyor ve onun üstüne 1 ekliyoruz
    setValue((p) => p + 1); // 0 + 1
    setValue((p) => p + 1); // 1 + 1
    // Yukarıdaki iki state içinde callback ile ilkinde 0 alınıp 1 artırıldı ikincisinde 1 olan değer alınıp 1 artırıldı ve 2 oldu artık value 2 olarak güncellendi.
  };

  // setValue(value + 1); olarak yazarsak yine ilk değer 0 alır ve 2 sn süre boyunca kaç kere basarsak basalım her seferinde 0 + 1 yapar ve sonuç 1 olur.
  // setValue((value) => value + 1); yaparsak güncellemeden hemen önceki halini alıp üstüne 1 ekleyecek yani 2 sn boyunca 10 kere tıklarsak value 10 olarak setlenir.
  const increase = () => {
    setTimeout(() => {
      setValue((v) => v + 1);
    }, 2000);
  };

  return (
    <>
      <section style={{ margin: "4rem 0" }}>
        <h2>Counter1</h2>
        <h3>{value}</h3>
        <button onClick={() => setValue((pre) => pre - 1)}>-</button>
        <button onClick={() => setValue(0)}>reset</button>
        <button onClick={handleUpdate}>+</button>
      </section>
      
      <section style={{ margin: "4rem 0" }}>
        <h2>Counter2</h2>
        <h3>{value}</h3>
        <button onClick={increase}>+</button>
      </section>
    </>
  );
};

export default UseStateCounter;
