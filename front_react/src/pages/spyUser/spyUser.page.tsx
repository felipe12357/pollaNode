import { FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import './spyUser.scss'
import SpyUserListComponent from "./components/spyUserList.component";

const SpyUserPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="spy-user-page">
      <div className="spy-user-page_menu">
        <button className="button button-primary" onClick={() => navigate('/home')} >
          <FaHome /> Home
        </button>
      </div>
      <SpyUserListComponent />
    </div>
  )
}

export default SpyUserPage