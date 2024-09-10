import React, { useState, useEffect } from 'react';
import './Like.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { observeLikes } from '../code/bandes-model';
import { toggleLike } from '../code/likes-model';

function Like({ initialLike = [], setLike, utilisateur, comicId }) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [like, setLocalLike] = useState(initialLike);

    useEffect(() => {
        const unsubscribe = observeLikes(comicId.id, setLocalLike);
        return () => unsubscribe();
    }, [comicId]);

    const handleLike = async () => {
        if (!utilisateur) {
            setSnackbarMessage("Connecte toi avant de liker!✋");
            setOpenSnackbar(true);
            return;
        }

        try {
            const updatedLikes = await toggleLike(comicId.id, utilisateur.uid, like);
            setLocalLike(updatedLikes);
            setLike(updatedLikes);
        } catch (error) {
            console.error("Erreur lors de la mise à jour des likes: ", error);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="Like">
            <IconButton color="secondary" aria-label="like" onClick={handleLike}>
                <FavoriteIcon />
            </IconButton>
            <p>{like.length}</p>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
}

export default Like;
