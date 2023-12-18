const LoginPage = () => {
  const handleLogin = async (event) => {
    event.preventDefault();

    // je récupère les infos du form (username et password)
    const username = event.target.username.value;
    const password = event.target.password.value;

    // je créé un objet avec les valeurs de username et password
    const loginData = {
      username,
      password,
    };

    // je transforme mon objet en JSON
    const loginDataJson = JSON.stringify(loginData);

    // je fais une requête vers l'API
    // de type post
    // avec mon objet JSON (username, password) en body
    // vu que j'envoie du JSON, je dois préciser
    // dans le headers que le contenu du body est du JSON
    const loginResponse = await fetch("http://localhost:3005/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: loginDataJson,
    });

    // je transforme la réponse de l'API (JSON) vers du JS
    const loginResponseData = await loginResponse.json();
    // je récupère le token généré par l'API dans la réponse
    const token = loginResponseData.data;

    // si le token existe
    if (token) {
      // je le stocke dans le local storage du navigateur
      localStorage.setItem("jwt", token);
    }
  };

  return (
    <section>
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