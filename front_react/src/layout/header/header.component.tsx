import { useNavigate } from 'react-router-dom';
import './header.scss';
import { useContextGlobal } from '../../contextGlobalProvider';

export const HeaderComponent = () =>{
  const navigate = useNavigate();
  const {appState: {user}} = useContextGlobal();
  
  return (
    <div className='header-component cursor-pointer'>
        <h1 onClick={() => navigate('/home')}>
            Polla Mundialista 2026
        </h1>
        { user && <span>Hola {user.username} - Salir </span> }
    </div>
  )
}