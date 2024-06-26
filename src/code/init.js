import objetConfig from './config';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialiser les services de Firebase (crééer une référence à une appli)
export const appli = initializeApp(objetConfig);

// Initialiser Firebase Authentication
export const firebaseAuth = getAuth(appli);

// Initialiser l'authentification fédérée avec Google (GoogleAuthProvider)
export const googleProvider = new GoogleAuthProvider(); 

// Initialiser Firestore
export const bd = getFirestore(appli);

// Exporter les services de Firebase et il y a la collection jse-bandes, jse-utlisateurs et dans jse-bande, il y a une collection commentaire
export const collectionBandes = 'jse-bandes';
export const collectionComs = 'commentaires';
export const collectionUtilisateurs = 'jse-utilisateurs';

// exporter les images des bandes qui sont dans le dossier jse-images/
// export const collectionImages = 'jse-images';

export default function formaterDateEtHeure(d) {
    const dateFormatee = d.toLocaleDateString('fr-CA', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
	return `${dateFormatee}`;
}
