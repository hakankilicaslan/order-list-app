import { useState } from "react";

const MultipleInputs = () => {
  const [person, setPerson] = useState({ name: "", email: "", age: "" });
  const [people, setPeople] = useState([]);

  // Bütün onChange eventlerinde handleChange fonksiyonunu tetikliyoruz ve inputun name ve value değerlerini alıp person state güncelliyoruz.
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Üç input için hangisini giriyorsak ondaki değer dinamik olarak alması için ve hangisi için değer giriliyorsa onu almak için name ve value değerlerini çektik.
    // Event üzerinden target ile name ve value değerlerini çektik person önceki halini yayıp sonra güncellenen değeri güncelenen isim için değiştirmiş olduk.
    // [name] olarak vermemizin nedeni state olan değil eventten aldığımız name değeri üzerinde çalışmak için köşeli parantez ile dışardaki name değişkenini çekiyoruz.
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.name && person.email && person.age) {
      const newPerson = { ...person, id: crypto.randomUUID() };
      setPeople([...people, newPerson]);
      setPerson({ name: "", email: "", age: "" });
    }
  };

  return (
    <>
      <article>
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={person.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={person.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" value={person.age} onChange={handleChange} />
          </div>
          <button onClick={handleSubmit}>Kişi Ekle</button>
        </form>
        {people.map((person) => {
          const { name, email, age, id } = person;
          return (
            <div key={id}>
              <h4>{name}</h4>
              <p>{email}</p>
              <p>{age}</p>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default MultipleInputs;
