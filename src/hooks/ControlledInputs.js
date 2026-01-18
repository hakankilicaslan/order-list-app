import { useState } from "react";

const ControlledInputs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [people, setPeople] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email) {
      setPeople([...people, { name, email, id: crypto.randomUUID() }]);
      setName("");
      setEmail("");
    }
  };

  return (
    <>
      <article>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.value.target)} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.value.target)} />
          </div>
          <button>Kişi Ekle</button>
        </form>
        {people.map((person) => {
          const { name, email, id } = person;
          return (
            <div key={id}>
              <h4>{name}</h4>
              <p>{email}</p>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default ControlledInputs;
