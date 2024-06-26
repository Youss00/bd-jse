import { collection, addDoc, doc, deleteDoc, orderBy, query, updateDoc, onSnapshot } from "firebase/firestore";
import { bd, collectionBandes, collectionComs } from "./init";

// Écouter les commentaires d'une bande quotidienne en temps réel
export function obtenir(idBande, callback) {
    const q = query(collection(bd, collectionBandes, idBande, collectionComs), orderBy("timestamp", "desc"));
    return onSnapshot(q, (querySnapshot) => {
        const lesCommentaires = querySnapshot.docs.map(doc => ({ id: doc.id, bandeId: idBande, ...doc.data() }));
        callback(lesCommentaires);
    });
}

// Créer un nouveau commentaire
export async function creer(commentaire) {
    const refComms = await addDoc(collection(bd, collectionBandes, commentaire.bandeId, collectionComs), commentaire);
    return refComms.id;
}

// Supprimer un commentaire
export async function supprimer(idCom, idBande) {
    const refComms = doc(bd, collectionBandes, idBande, collectionComs, idCom);
    await deleteDoc(refComms);
}

// Mettre à jour les votes d'un commentaire
export async function mettreAJourVotes(idCom, idBande, votes) {
    if (!idCom || !idBande || !votes) {
        console.error("Les paramètres idCom, idBande ou votes sont manquants.");
        console.log("idCom:", idCom);
        console.log("idBande:", idBande);
        console.log("votes:", votes);
        return;
    }

    try {
        const refComms = doc(bd, collectionBandes, idBande, collectionComs, idCom);
        await updateDoc(refComms, { votes });
    } catch (error) {
        console.error("Erreur lors de la mise à jour des votes: ", error);
    }
}
