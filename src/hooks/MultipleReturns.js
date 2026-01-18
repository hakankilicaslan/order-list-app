import { useState, useEffect } from "react";

const url = "https://api.github.com/users/kevinclark";

// Aşağıda stateler kullanarak ekranda state değişikliklerine göre farklı returnler dönüyoruz ve loading, error durumunda ya da data geldiğinde farklı şeyler gösteriyoruz.
const MultipleReturns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState("default user");

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          setIsLoading(false);
          setIsError(true);
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        setIsLoading(false);
        const { login } = data;
        setUser(login);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) return <div><h1>Loading...</h1></div>

  if (isError) return <div><h1>Error...</h1></div>

  return <div><h1>{user}</h1></div>
};

export default MultipleReturns;
