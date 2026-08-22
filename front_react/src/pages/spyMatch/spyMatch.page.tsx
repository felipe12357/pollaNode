import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import type { SpyMatchReturn } from "./spyMatch.loader";
import './spyMatch.scss';
import { useContextGlobal } from "../../contextGlobalProvider";

const SpyMatchPage = () => {
    const navigate = useNavigate();
    const { matchForecast } = useLoaderData() as SpyMatchReturn;
    const { appState: {user} } = useContextGlobal();

    
    return (
        <div className="spy-user-page">
            <div className="spy-user-page_menu">
                <button className="button button-primary" onClick={() => navigate(`/forecast/${user!.id}`)} >
                    <FaArrowLeft /> Regresar
                </button>
            </div>
            <div className="container spy-match">
                <div>
                    <div ><b>Partido: </b> { matchForecast.team1} Vs { matchForecast.team2 }</div>
                    <div><b>Resultado: </b> { matchForecast.result}</div>
                </div>
                <div className="match-row header">
                    <div> Usuario </div>
                    <div> Pronostico </div>
                    <div> Puntos </div>
                </div>

                { matchForecast.foreCast.map((forecast, i) =>
                    <div className={` match-row 
                        ${forecast.user === user?.username ? 'result-row-own-result' : ''}`} key={i}>
                        <div> {forecast.user } </div>
                        <div> { forecast.resultForeCast }</div>
                        <div> { forecast.points} </div>
                    </div>
                )}
            </div>
      </div>
    )
}

export default SpyMatchPage;