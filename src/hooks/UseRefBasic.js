import { useEffect, useRef } from "react";

// useRef useState gibi ama onun aksine rerender tetiklemiyor.
const UseRefBasic = () => {
  const refContainer = useRef(null);
  const divContainer = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(refContainer.current.value);
    console.log(divContainer.current);
  };

  useEffect(() => {
    console.log(refContainer.current.value);
    refContainer.current.focus(); // Sayfayı her yenilediğimizde input etiketine odaklı şekilde sayfa açılır.
  });

  // input içine referans veriyoruz ve useRef çağırdıktan sonra inputu dinliyoruz ve refContainer içinden current içinden input etiketini yakalayabiliyoruz.
  // input için ref kullanarak submit durumunda refContainer.current.value ile inputun değerini alabiliyoruz.
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" ref={refContainer} />
        </div>
        <button>Submit</button>
      </form>
      <div ref={divContainer}>Hello World</div>
    </>
  );
};

export default UseRefBasic;
