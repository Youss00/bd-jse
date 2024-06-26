import './Entete.scss'
import Avatar from '@mui/material/Avatar';
import { connexion, deconnexion } from '../code/utilisateur-modele';
import LogoutIcon from '@mui/icons-material/Logout';

function Entete({ util }) {
  return (
    <header className="Entete">
      <h1>TOONWEB</h1>
      <div className='avatar' color='primary'>
        {util 
          ? <>
              <Avatar src={util.photoURL} />
              <span>{util.displayName}</span> 
              <div className='deconnexion' onClick={deconnexion}><LogoutIcon/></div>
            </>
          : 
          <>
          <Avatar/>
          <button onClick={connexion}>SE CONNECTER </button>
        </>
        }
      </div>
    </header>
  )
}

export default Entete;