import { useEffect, useState } from "react";

const UseEffectCleanup = () => {
  const [size, setSize] = useState(window.innerWidth); // Sayfanın beyaz kısmının genişliğini başlangıç değeri olarak veriyoruz.

  const checkSize = () => setSize(window.innerWidth); // Sayfanın genişliği değiştiğinde bunu size kısmına setliyoruz

  // resize ile ekran her büyüyüp küçüldüğünde çalışacak bir addEventListener ekliyoruz ve ekran genişliği değiştiğinde fonksiyon çalıştırılıyor.
  // Ekran genişliği her değiştiğinde bu event dinleniyor ve bunu Event Listeners listesinde tutuyor genişlik ne kadar değişirse bunu dinliyor.
  // Çok sayıda değişiklik yaptığımızda bütün eventler orada listeleniyor ve çok fazla event tutuluyor bunu cleanup ile engelleyeceğiz.
  useEffect(() => {
    window.addEventListener("resize", checkSize);

    // useEffect içine return kısmına bir event listener daha ekleyerek önceki dinlenen eventleri silip sadece yenisini eklemesini sağlayacağız.
    // Bunun için return kısmına bir cleanup fonksiyon ekliyoruz ve yine resize durumunda removeEventListener ile bu eventleri siliyoruz.
    // useEffect içini çalıştırmadan önce return kısmını çalıştırıyor ve öncekileri siliyoruz sonra üstteki addEventListener çalıştırmış oluyoruz.
    // useEffect için return kısmına yazılan fonksiyon içini çalıştırmadan önce yapılacakları yapmasını sağlıyor bu şekilde cleanup yapmış oluyoruz.
    return () => window.removeEventListener("resize", checkSize);
  });

  return (
    <>
      <h1>Window</h1>
      <h2>{size}px</h2>
    </>
  );
};

export default UseEffectCleanup;
