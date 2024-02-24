import React, { useEffect, useState } from "react";
import Api from '../../api/Api';
import {Link} from 'react-router-dom'
import './Home.css'


function Home(){

    const [filmes, setFilmes] = useState([]);


    useEffect(() => {
        async function loadFilmes(){
            const response = await Api.get("movie/now_playing", {
                params: {
                    api_key: "577d2f5b971dd09c01fbd6510959c091",
                    language: "pt-BR",
                    page: 1
                }
            })

            //console.log(response.data.results);
            setFilmes(response.data.results.slice(0, 10));
        }

        loadFilmes();
    }, []);


    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}

            </div>
            
        </div>
    )
}


export default Home;