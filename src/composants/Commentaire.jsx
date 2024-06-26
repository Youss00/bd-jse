import './Commentaire.scss';
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Snackbar from '@mui/material/Snackbar';
import formaterDateEtHeure from '../code/init';
import { mettreAJourVotes, supprimer } from '../code/commentaire-modele'; // Import your backend vote update logic
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

function Commentaire({ commentaire, util }) {
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [votes, setVotes] = useState(commentaire.votes || {});

    useEffect(() => {
        setVotes(commentaire.votes || {});
    }, [commentaire]);

    useEffect(() => {
        setLikeClicked(votes[util?.uid] === 1);
        setDislikeClicked(votes[util?.uid] === -1);
    }, [votes, util]);

    const handleLikeClick = async () => {
        if (!util) {
            setSnackbarMessage("Connecte toi avant de voter!✋");
            setOpenSnackbar(true);
            return;
        }
        const newVotes = { ...votes, [util.uid]: likeClicked ? 0 : 1 };
        setVotes(newVotes);
        setLikeClicked(!likeClicked);
        setDislikeClicked(false);

        console.log("handleLikeClick - Commentaire ID:", commentaire.id);
        console.log("handleLikeClick - Bande ID:", commentaire.bandeId);
        console.log("handleLikeClick - New Votes:", newVotes);

        try {
            await mettreAJourVotes(commentaire.id, commentaire.bandeId, newVotes); // Update the call here
        } catch (error) {
            console.error("Erreur lors de la mise à jour des votes: ", error);
        }
    };

    const handleDislikeClick = async () => {
        if (!util) {
            setSnackbarMessage("Connecte toi avant de voter!✋");
            setOpenSnackbar(true);
            return;
        }
        const newVotes = { ...votes, [util.uid]: dislikeClicked ? 0 : -1 };
        setVotes(newVotes);
        setDislikeClicked(!dislikeClicked);
        setLikeClicked(false);

        console.log("handleDislikeClick - Commentaire ID:", commentaire.id);
        console.log("handleDislikeClick - Bande ID:", commentaire.bandeId);
        console.log("handleDislikeClick - New Votes:", newVotes);

        try {
            await mettreAJourVotes(commentaire.id, commentaire.bandeId, newVotes); // Update the call here
        } catch (error) {
            console.error("Erreur lors de la mise à jour des votes: ", error);
        }
    };

    const handleDeleteClick = async () => {
        if (!util) {
            setSnackbarMessage("Connecte toi avant de supprimer un commentaire!✋");
            setOpenSnackbar(true);
            return;
        }
        try {
            await supprimer(commentaire.id, commentaire.bandeId);
            setSnackbarMessage("Commentaire supprimé avec succès!🗑️");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Erreur lors de la suppression du commentaire: ", error);
            setSnackbarMessage("Erreur lors de la suppression du commentaire.🚫");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const likeCount = Object.values(votes).filter(vote => vote === 1).length;
    const dislikeCount = Object.values(votes).filter(vote => vote === -1).length;

    return (
        <div className="Commentaire">
            <Stack direction="column" spacing={2}>
                <div className="comment">
                    <Avatar className="Avatar" alt={commentaire.nomUtil} src="/static/images/avatar/1.jpg" />
                    <div className="commentUtilisateur">
                        <h4>{commentaire.nomUtil}</h4>
                        <p>{commentaire.texte}</p>
                        <p>({formaterDateEtHeure(new Date(commentaire.timestamp))})</p>
                        <div className="vote">
                            <button onClick={handleLikeClick}>
                                {likeCount}
                                <ThumbUpAltIcon style={{ color: likeClicked ? 'lightgreen' : 'inherit' }} />
                            </button>
                            <button onClick={handleDislikeClick}>
                                {dislikeCount}
                                <ThumbDownIcon style={{ color: dislikeClicked ? 'red' : 'inherit' }} />
                            </button>
                        </div>
                    </div>
                    {util?.uid === commentaire.idUtil && (
                        <IconButton onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
            </Stack>
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

export default Commentaire;
