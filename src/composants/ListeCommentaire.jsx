import './ListeCommentaire.scss';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Commentaire from './Commentaire';
import Snackbar from '@mui/material/Snackbar';
import SendIcon from '@mui/icons-material/Send';

function ListeCommentaire({ commentaires, nbCommentaire, ajouterCommentaire, util }) {
    const [nouveauCommentaire, setNouveauCommentaire] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!util) {
            setSnackbarMessage("Veuillez vous connecter pour ajouter un commentaire");
            setOpenSnackbar(true);
            return;
        }
        if (!nouveauCommentaire.trim()) {
            return;
        }
        ajouterCommentaire({
            nomUtil: util ? util.displayName : "Anonyme",
            texte: nouveauCommentaire,
            timestamp: new Date().toISOString(),
        });
        setNouveauCommentaire(""); // Réinitialisez le champ de saisie
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    
    return (
        <div className="ListeCommentaire">
            <div className="text">
                <h2>COMMENTAIRES</h2>
                <p>{nbCommentaire(commentaires)} commentaires</p>

                <form id="form" onSubmit={handleSubmit}>
                    <input
                        type="search"
                        id="query"
                        name="q"
                        placeholder="Écrire un commentaire"
                        value={nouveauCommentaire}
                        onChange={e => setNouveauCommentaire(e.target.value)}
                    />
                    <button type="submit"><SendIcon/></button>
                </form>
            </div>

            <Stack direction="column" spacing={3} marginTop={4}>
                {commentaires.map((commentaire, index) => (
                    <Commentaire key={index} commentaire={commentaire} util={util}/>
                ))}
            </Stack>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
}

export default ListeCommentaire;
