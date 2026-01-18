import { useEffect, useState } from "react";

const url = "https://api.github.com/users";

const UseEffectFetchData = () => {
  const [users, setUsers] = useState([]);

  // Asenkron bir fonksiyon kurup github api üzerinden fetch ile kullanıcıları çekiyoruz sonra users içine setliyoruz.
  const getUsers = async () => {
    const response = await fetch(url);
    const users = await response.json();
    setUsers(users);
  };

  // useEffect içine asenkron olan getUsers fonksiyonunu ekledik ve orada da fetch isteği yapıyoruz.
  // Bağımlılık olarak da boş dizi ekliyoruz ve sadece sayfa ilk açıldığında render edildiğinde çalışmasını sağlıyoruz.
  // Yukarıdaki fonksiyonda setUsers ile state setlemesi olduğundan dolayı tekrar render işlemi tetiklenecek.
  // Eğer boş dizi eklemeseydik her renderda useEffect çalışacak ve bu da sonsuz döngüye neden olacaktı.
  // State güncellemesi olduğu için rerender olacak ve useEffect tekrar çalışıp tekrar tekrar setleme ve istek gerçekleşecekti.
  useEffect(() => getUsers(), []);

  return (
    <>
      <h3>Github Users</h3>
      <ul>
        {users.map((user) => {
          const { id, login, avatar_url, html_url } = user;
          
          return (
            <li key={id}>
              <img src={avatar_url} alt={login} />
              <div>
                <h4>{login}</h4>
                <a href={html_url}>Profil URL</a>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UseEffectFetchData;
