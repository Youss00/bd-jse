// bandes-model.js
import { bd, collectionBandes } from './init';
import { collection, onSnapshot, orderBy, query, doc } from 'firebase/firestore';

export async function observer(mut) {
  return onSnapshot(
    query(collection(bd, collectionBandes)),
    orderBy('dpub', 'desc'),
    resultatSnapshot => {
      const commFS = resultatSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      mut(commFS)
    }
  );
}
// bandes-model.js
// import { bd } from './init';
// import { doc, onSnapshot } from "firebase/firestore";

export function observeLikes(comicId, callback) {
  if (!comicId) {
      return () => {}; // Return a no-op function if comicId is invalid
  }

  const comicDocRef = doc(bd, 'jse-bandes', comicId);

  return onSnapshot(comicDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          callback(data.aime || []); // Ensure 'aime' is an array
      }
  });
}


export function formaterDate(dateStr) {
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
}