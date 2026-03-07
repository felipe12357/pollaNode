import { useNavigate } from 'react-router-dom';
import './header.scss';

export const HeaderComponent = () =>{
  const navigate = useNavigate();

  return (
    <div className='header-component cursor-pointer'>
        <h1 onClick={() => navigate('/home')}>
            Polla Mundialista 2026
        </h1>
    </div>
  )
}