import { useState } from "react";

const data = [
  { id: 1, name: "Hakan" },
  { id: 2, name: "Selma" },
  { id: 3, name: "Kılıç" },
  { id: 4, name: "Aslan" },
];

// PropDrill bileşenin alt bileşeni olan List içine props olarak people state'i ve removePerson fonksiyonunu iletiyoruz.
const PropDrill = () => {
  const [people, setPeople] = useState(data);

  const removePerson = (id) => {
    setPeople((people) => people.filter((person) => person.id !== id));
  };

  return (
    <section>
      <h3>Prop Drill</h3>
      <List people={people} removePerson={removePerson} />
    </section>
  );
};

// List bileşenin alt bileşeni olan SinglePerson içine props olarak her person nesnesini ve removePerson fonksiyonunu iletiyoruz.
// removePerson List içinde kullanılmamasına rağmen SinglePerson içinde kullanıldığı için yukarıdan aldığımız fonksiyonu hiç kullanmadan alt bileşene iletiyoruz.
// Bu duruma prop drill deniyor en üst bileşenden gerekli olan bileşene kadar dele dele alta iniyor ama aradaki bileşenlerde hiç kullanılmıyor.
// useContext kullanarak alt bileşenlere props olarak aktarmak yerine direkt kullanmak isteyen bileşene aktarımını sağlayabiliriz.
const List = ({ people, removePerson }) => {
  return (
    <>
      {people.map((person) => {
        return (
          <SinglePerson
            key={person.id}
            {...person} // {...person} diyerek spread kullanıp personu alt bileşene props olarak aktarabiliyoruz.
            removePerson={removePerson}
          />
        );
      })}
    </>
  );
};

const SinglePerson = ({ id, name, removePerson }) => {
  return (
    <div>
      <h4>{name}</h4>
      <button onClick={() => removePerson(id)}>Kaldır</button>
    </div>
  );
};

export default PropDrill;
