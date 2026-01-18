import { useState } from "react";

const peopleData = [
  { id: 1, name: "Hakan" },
  { id: 2, name: "Selma" },
  { id: 3, name: "Kılıç" },
  { id: 4, name: "Aslan" },
];

// people başlangıçta state içinde peopleData dizisini tutuyor ve Sil butonuna tıklayınca boş dizi setleniyor.
// Kaldır butonunda da people dizisinde gelen id dışındakiler filtreleniyor yani diziden o id sahip olan nesne kaldırılıp setleniyor.
const UseStateArray = () => {
  const [people, setPeople] = useState([peopleData]);

  const removePerson = (id) => {
    let newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
  };

  return (
    <>
      {people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id}>
            <h4>{name}</h4>
            <button onClick={() => removePerson(id)}>Kaldır</button>
          </div>
        );
      })}
      <button onClick={() => setPeople([])}>Sil</button>
    </>
  );
};

export default UseStateArray;
