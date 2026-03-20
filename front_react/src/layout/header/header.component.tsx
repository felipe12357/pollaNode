import { useNavigate } from 'react-router-dom';
import './header.scss';
import { useContextGlobal } from '../../contextGlobalProvider';
import { FaSignOutAlt } from 'react-icons/fa';
import { ACTION_TYPES_APP } from '../../redux/app.actions';
import { removeSessionUser } from '../../utilities/session.storage';

export const HeaderComponent = () =>{
  const navigate = useNavigate();
  const { appState: {user}, dispatch } = useContextGlobal();

  const closeSession = () => {
    dispatch({type: ACTION_TYPES_APP.SET_USER, payload:null});
    removeSessionUser();
    navigate('/login');
  } 

  return (
    <div className='header-component'>
        <h1 className='cursor-pointer' onClick={() => navigate('/home')}>
          Polla Mundialista 2026
        </h1>
        { user && 
          <span>Hola {user.username}
            <button className="button button-danger" onClick={() => closeSession()} >
              <FaSignOutAlt  /> Salir
            </button>
          </span> }
    </div>
  )
}