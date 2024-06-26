// likes-model.js
import { bd } from './init';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export async function toggleLike(comicId, userId, likeArray) {
    const comicDocRef = doc(bd, 'jse-bandes', comicId);

    if (likeArray.includes(userId)) {
        await updateDoc(comicDocRef, {
            aime: arrayRemove(userId)
        });
        return likeArray.filter(uid => uid !== userId);
    } else {
        await updateDoc(comicDocRef, {
            aime: arrayUnion(userId)
        });
        return [...likeArray, userId];
    }
}
