import { useState } from "react";

const LoginPage = () => {
  const [message, setMessage] = useState(null);
// variable qui va vérifier les info lors de la connexion (check du role dans le back)
  const handleLogin = async (event) => {
    event.preventDefault();

    // var pour la connexion
    const username = event.target.username.value;
    const password = event.target.password.value;

    // variable qui stock les info de mon utilisateur
    const loginData = {
      username,
      password,
    };

    // objet => JSON
    const loginDataJson = JSON.stringify(loginData);



       //requête vers l'API de type post
      // de mon username et password en json (précisions a mon api que je suis en json)

    const loginResponse = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: loginDataJson,
    });


     // attente de l'API (JSON=>js)
    const loginResponseData = await loginResponse.json();
    // récupération du token
    const token = loginResponseData.data;


    // si le token est vérifié j'indique a mon utilisateur qu'il est connecté
    if (token) {
      localStorage.setItem("jwt", token);
      setMessage("Vous êtes bien connecté");
    } else {
      setMessage("Erreur lors de la connexion");
      // indication d'une erreur du token
    }
  };

  return (
    <section>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <label>
          username
          <input type="text" name="username" />
        </label>
        <label>
          password
          <input type="password" name="password" />
        </label>
        <input type="submit" />
      </form>
    </section>
  );
};
    
  export default LoginPage;