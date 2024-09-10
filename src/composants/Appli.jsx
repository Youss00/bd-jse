import React, { useState, useEffect } from 'react';
import './Appli.scss';
import Like from './Like';
import Entete from './Entete';
import Comic from './Comic';
import ListeCommentaire from './ListeCommentaire';
import Snackbar from '@mui/material/Snackbar';
import { observer } from "../code/bandes-model";
import { obtenir, creer } from '../code/commentaire-modele';
import { observerEtatConnexion } from '../code/utilisateur-modele.js';

function Appli() {
  const [bandesImg, setBandesImg] = useState([]);
  const [img, setImg] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState('');
  const [like, setLike] = useState([]);
  const [motCle, setMotCle] = useState([]);
  const [utilisateur, setUtilisateur] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    observerEtatConnexion((user) => {
      if (user) {
        setSnackbarMessage(`Bienvenue, ${user.displayName}! 👋`);
      } else if (utilisateur) { // Only show "Au revoir" if a user was previously logged in
        setSnackbarMessage("Au revoir ! 👋");
      }
      setUtilisateur(user);
      setOpenSnackbar(true);
    });
  }, [utilisateur]);

  async function ajouterCommentaire(nouveauCommentaire) {
    if (!utilisateur) {
      setSnackbarMessage("Connecte toi avant d'écrire un commentaire!✋");
      setOpenSnackbar(true);
      return;
    }
    const bande = bandesImg[index];
    if (bande) {
      const idBande = bande.id;
      const commentaireAvecIdBande = {
        ...nouveauCommentaire,
        bandeId: idBande,
        idUtil: utilisateur.uid
      };
      const idCom = await creer(commentaireAvecIdBande);
      // setCommentaires(prevCommentaires => [{ ...commentaireAvecIdBande, id: idCom }, ...prevCommentaires]);
    }
  }

  useEffect(() => {
    observer(setBandesImg);
  }, [])

useEffect(() => {
  if (bandesImg.length > 0) {
    const bande = bandesImg[index];
    if (bande) {
      setImg(bande.url);
      setLike(bande.aime);
      setMotCle(bande.motsCles);
      setDate(bande.dpub);
      
      const unsubscribe = obtenir(bande.id, setCommentaires);
      return () => unsubscribe();  // Clean up the listener on unmount or when the bande changes
    }
  }
}, [bandesImg, index]);


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className="Appli">
      <Entete util={utilisateur} />
      <Comic bandesImg={bandesImg} img={img} motCle={motCle} index={index}
        setIndex={setIndex} commentaires={commentaires}
        like={like} setLike={setLike} ajouterCommentaire={ajouterCommentaire} date={date} util={utilisateur} />
      {/* <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      /> */}
    </div>
  )
}

export default Appli;
