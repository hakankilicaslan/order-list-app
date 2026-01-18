import { useReducer, useState, useEffect } from "react";

// reducer fonksiyonunun kullanacağı başlangıç değeridir.
const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: "hello world",
};

const UseReducer = () => {
  const [name, setName] = useState("");

  // reducer çalıştıracağımız fonksiyon, defaultState ise başlangıç değerimiz nesnemiz oluyor. 
  // dispatch ile reducer fonksiyonumuzu çalıştırıyoruz içine verdiğimiz değeri reducer'a iletiyor.
  // dispatch fonksiyonu ile yeni aksiyon gönderiyoruz ve reducer eski state alıp işleyip yeni state bize geri döndürecek.
  const [state, dispatch] = useReducer(reducer, defaultState);

  // form submit edildiğinde inputa girilen name değeri alınır yeni nesne oluşturulur ve dispatch içindeki nesneye type ile birlikte verilir.
  // Verdiğimiz type değeri ADD_PERSON olduğu için payload olarak gönderdiğimiz değeri reducer içinde alıyoruz ve listemizin sonuna ekleyeceğiz.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newPerson = { id: crypto.randomUUID(), name };
      dispatch({ type: "ADD_PERSON", payload: newPerson });
      setName("");
    } else {
      dispatch({ type: "NO_VALUE" });
    }
  };

  // Modal içinden setTimeout ile 3sn sonra fonksiyonumuz tetikleniyor ve dispatch ile gerekli type gönderilip reducer üzerinden isModalOpen false yapılıp Modal ekrandan kaldırılıyor.
  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });

  return (
    <>
      {state.isModalOpen && <Modal closeModal={closeModal} modalContent={state.modalContent} />}

      <form onSubmit={handleSubmit}>
        <div><input type="text" value={name} onChange={(e) => setName(e.target.value)}/></div>
        <button>Ekle</button>
      </form>

      {state.people.map((person) => {
        return (
          <div key={person.id}>
            <h4>{person.name}</h4>
            <button onClick={() => dispatch({ type: "REMOVE_PERSON", payload: person.id })}>
              Kaldır
            </button>
          </div>
        );
      })}
    </>
  );
};

// Modal bileşeni çalıştırıldığında ekranda modalContent gösteriliyor ve 3sn sonra closeModal fonksiyonu tetiklenerek ekrandan kaldırılıyor.
const Modal = ({ modalContent, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  }, []);

  return <div><p>{modalContent}</p></div>
};

// state güncellenmeden önceki durumu ifade ediyor ve gönderdiğimiz aksiyon yani action baz alınıp state değerimiz güncelleniyor.
// dispatch içine verilen action ile reducer tetiklendi ve gelen type baz alınarak önceki state değeri action'a göre güncellendi.
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PERSON": {
      return {...state, people: [...state.people, action.payload], isModalOpen: true, modalContent: "Kişi Eklendi" };
    }
    case "NO_VALUE": {
      return {...state, isModalOpen: true, modalContent: "Lütfen değer giriniz"};
    }
    case "CLOSE_MODAL": {
      return {...state, isModalOpen: false};
    }
    case "REMOVE_PERSON": {
      const newPeople = state.people.filter((person) => person.id !== action.payload)
      return {...state, people: newPeople};
    }
    default:
      return state;
      // throw new Error('Eşleşen action türü yok...') farklı bir aksiyon türü gönderildiyse hata da fırlatabiliriz.
  }
};


export default UseReducer;
