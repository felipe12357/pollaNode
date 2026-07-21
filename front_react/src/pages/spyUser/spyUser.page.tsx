import { FaHome } from "react-icons/fa"
import { useNavigate, useSearchParams } from "react-router-dom";
import './spyUser.scss'
import SpyUserListComponent from "./components/spyUserList.component";

const SpyUserPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  return (
    <div className="spy-user-page">
      <div className="spy-user-page_menu">
        <button className="button button-primary" onClick={() => navigate('/home')} >
          <FaHome /> Home
        </button>
        <h2> Pronósticos de {searchParams.get('name')} </h2>
      </div>
      <SpyUserListComponent />
    </div>
  )
}

export default SpyUserPage