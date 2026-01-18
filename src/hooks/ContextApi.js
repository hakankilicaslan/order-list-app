import { useState, useContext, createContext } from "react";

const data = [
  { id: 1, name: "Hakan" },
  { id: 2, name: "Selma" },
  { id: 3, name: "Kılıç" },
  { id: 4, name: "Aslan" },
];

// Bir createContext nesnesi oluşturup PersonContext değişkenine atıyoruz.
const PersonContext = createContext();

const ContextApi = () => {
  const [people, setPeople] = useState(data);

  const removePerson = (id) => {
    setPeople((people) => people.filter((person) => person.id !== id));
  };

  // Oluşturduğumuz createContext'in Provider'ına value olarak taşıyacağımız değeri yani removePerson fonksiyonumuzu veriyoruz.
  // Sardığımız yapının içine List bileşeni olduğu için o ve onun altındaki bileşenler useContext ile removePersone'a erişebilecek.
  return (
    <PersonContext.Provider value={{ removePerson }}>
      <h3>Prop Drill</h3>
      <List people={people} />
    </PersonContext.Provider>
  );
};

const List = ({ people }) => {
  return (
    <>
      {people.map((person) => {
        return (
          <SinglePerson
            key={person.id}
            {...person}
          />
        );
      })}
    </>
  );
};

// useContext(PersonContext) diyerek value içine verdiğimiz removePerson kullanabiliyoruz nesne olduğu için nesne parçalayarak fonksiyona eriştik.
// Önceki örnekte PropDrill içinde önce List bileşenine ordan SinglePerson'a prop ile iletiyorduk artık useContext kullanarak bu sorunu aştık.
const SinglePerson = ({ id, name }) => {
  const {removePerson} = useContext(PersonContext);
  return (
    <div>
      <h4>{name}</h4>
      <button onClick={() => removePerson(id)}>Kaldır</button>
    </div>
  );
};

export default ContextApi;
