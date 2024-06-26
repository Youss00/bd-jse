import React from 'react';
import './Comic.scss';
import ListeCommentaire from './ListeCommentaire';
import Like from './Like';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function Comic({ bandesImg, img, index, motCle, setIndex, commentaires, like, setLike, ajouterCommentaire, date, util }) {
  const nextComic = () => {
    if (index < bandesImg.length - 1) {
      setIndex(index + 1);
    }
  };

  const previousComic = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const firstComic = () => {
    setIndex(0);
  }

  const lastComic = () => {
    if (bandesImg.length > 0) {
      setIndex(bandesImg.length - 1);
    }
  }

  const countComments = (comments) => {
    return comments.length;
  };

  const setCurrentLike = (newLike) => {
    const updatedBandesImg = [...bandesImg];
    updatedBandesImg[index].aime = newLike;
    setLike(newLike);
  };

  const currentComic = bandesImg[index] || {};
  const comicLikes = currentComic.aime || [];

  function formaterDate(dateStr) {
    try {
      if (typeof dateStr !== 'string') {
        throw new TypeError('Le paramètre doit être une chaîne de caractères au format "AAAAMMJJ"');
      }
  
      // Convertir la chaîne en un objet Date
      const annee = parseInt(dateStr.substring(0, 4), 10);
      const mois = parseInt(dateStr.substring(4, 6), 10) - 1; // Les mois sont indexés à partir de 0
      const jour = parseInt(dateStr.substring(6, 8), 10);
  
      const date = new Date(annee, mois, jour);
  
      if (isNaN(date.getTime())) {
        throw new Error('Date invalide');
      }
  
      // Formater la date en français
      const dateFormatee = date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  
      return dateFormatee;
    } catch (error) {
      console.error('Erreur de formatage de date:', error.message, 'Date fournie:', dateStr);
      return 'Date invalide';
    }
  }

  console.log(date);
  return (
    <div className="Comic">
      <p>
        {Array.isArray(motCle) ? motCle.map((mot, idx) => {
          return <span key={idx} className='motCle'>#{mot} </span>
        }) : null}
      </p>
      <p>({formaterDate(date)})</p>
      <Like initialLike={comicLikes} setLike={setCurrentLike} utilisateur={util} comicId={currentComic} />

      <div>
        <button onClick={firstComic}><KeyboardDoubleArrowLeftIcon /></button>
        <button onClick={previousComic}><ArrowBackIosIcon /></button>
        <button onClick={nextComic}><ArrowForwardIosIcon /></button>
        <button onClick={lastComic}><KeyboardDoubleArrowRightIcon /></button>
      </div>
      <div className="ensemble">
        <img className='comicImg' src={img} alt="comic" />
        <ListeCommentaire commentaires={commentaires} nbCommentaire={countComments} ajouterCommentaire={ajouterCommentaire} util={util} />
      </div>
    </div>
  );
}

export default Comic;
