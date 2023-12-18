import React, { useEffect, useState } from "react";
// admincoworkingpage permet a un utilisateur avec des perm de supprimer des coworking route (app.js)

const AdminCoworkingsPage = () => {
  const [coworkings, setCoworkings] = useState(null);
  // Une fonction hook useState est  créée afin d'être utilisée pour prendre en compte la suppression puis la nouvelle liste
  useEffect(() => {
    (async () => {
      const coworkingsResponse = await fetch("http://localhost:3000/api/coworkings");
      const coworkingsResponseData = await coworkingsResponse.json();
      // obtention de la liste avant action ou non de mon utilisateur
      setCoworkings(coworkingsResponseData);
    })();
  }, []);

//   récupération de l'id du coworking que l'utilisateur souhaite supp
  const handleDeleteCoworking = async (event, coworkingId) => {
    // action uniquement possible si un token vérifie nos permi.
    const token = localStorage.getItem("jwt");
    
     // requête de suppression est envoyé via l'API
    // le cowrking a sup est lier a son ID
    await fetch("http://localhost:3000/api/coworkings/" + coworkingId, {
        // on utilise la method delete
      method: "DELETE",
    //   envoie du token a l'api pour effectuer la suppression
      headers: { Authorization: "Bearer " + token },
    });

    // on récup la nouvelle liste des cowrkings apres la sup
    const coworkingsResponse = await fetch("http://localhost:3000/api/coworkings");
    const coworkingsResponseData = await coworkingsResponse.json();
    // on effectue le nouveau rendu des coworkings
    setCoworkings(coworkingsResponseData);
  };

  return (
    <>
      <h1>Liste des coworkings : </h1>

      {coworkings ? (
        <>
          {coworkings.map((coworking) => {
            return (
              <article>
                <h2>{coworking.name}</h2>
                {/* evenement se passe au niv du click  qui récup l'id et event a effectuer */}
                <button onClick={(event) => handleDeleteCoworking(event, coworking.id)}>Supprimer</button>
              </article>
            );
          })}
        </>
      ) : (
        <p>En cours de chargement</p>
      )}
    </>
  );
};

export default AdminCoworkingsPage;
