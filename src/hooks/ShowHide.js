import { useEffect, useState } from "react"

const ShowHide = () => {
  const [show, setShow] = useState(false);

  return (
    <>
    <button onClick={() => {setShow(p => !p)}}>Göster/Gizle</button>
    {show && <Item/>}
    </>
  )
}

const Item = () => {
    const [size, setSize] = useState(window.innerWidth);

    const checkSize = () => setSize(window.innerWidth)

    // useEffect için boş array versek bile DOM manipülasyonu yaptığımız için sadece ilk açtığında değil sürekli çalışmaya devam ediyor.
    // Boş array versek bile cleanup fonksiyonunu da return sonrası yazarak önceki eventleri silmek zorundayız.
    useEffect(() => {
      window.addEventListener("resize", checkSize)

      return () => window.removeEventListener("resize", checkSize)
    }, [])

    return (
      <div>
        <h1>Window: </h1>
        <h2>Size: {size}px</h2>
      </div>
    )
}

export default ShowHide