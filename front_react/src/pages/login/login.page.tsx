import { useNavigate } from "react-router-dom";
import './login.scss';
import userService from "../../services/session.service";
import type { UserLoginDto } from "../../dtos/user";


const LoginPage = () =>{
  const navigate = useNavigate();

  const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as UserLoginDto;
    const result = await userService.login(data)
    console.log(result);
    // navigate('/home');
  } 

  return(
    <form className='container login-component' onSubmit={handleSubmit}>
      <div>
          <div>
              <label htmlFor="username"> Username: </label>
              <input type="text" name="username" id="user" required></input>
          </div>

          <div>
              <label htmlFor="password"> Password: </label>
              <input type="password" name="password" id="password" required></input>
          </div>
      </div>
      <div>
        <button className='button'>Loggin</button> 
      </div>
    </form>
  )
}

export default LoginPage;