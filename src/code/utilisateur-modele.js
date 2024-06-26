import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { firebaseAuth, googleProvider, bd, collectionUtilisateurs } from "./init";
import { doc, setDoc } from "firebase/firestore";

/**
 * Permet à un utilisateur de se connecter en utilisant l'authentification
 * fédérée Google.
 */
export function connexion() {
  signInWithPopup(firebaseAuth, googleProvider).then(
    (u) => console.log("Utilisateur", u)
  )
}

export function deconnexion() {
  signOut(firebaseAuth);
}

/**
 * Enregistre l'observateur de connexion Firebase Auth.
 * @param {function} mutateurUtil fonction de mutation de l'état 'utilisateur'.
 * @return void.
 */
export function observerEtatConnexion(mutateurUtil) {
  onAuthStateChanged(firebaseAuth, u => {
                      if(u) {
                        // Enregistrer les données de cet utilisateur dans Firestore
                        setDoc(
                          doc(bd, collectionUtilisateurs, u.uid),
                          {
                            nomComplet: u.displayName,
                            avatar: u.photoURL,
                            dcc: (new Date()).getTime(),
                            courriel: u.email
                          },
                          {merge: true}
                        )
                      }
                      mutateurUtil(u)
                    }
  );
}