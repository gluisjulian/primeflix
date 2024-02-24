import React, { useEffect, useState } from "react";
import Api from '../../api/Api';


function Home(){

    const [filme, setFilme] = useState([]);


    useEffect(() => {
        async function loadFilmes(){
            const response = await Api.get("movie/now_playing", {
                params: {
                    api_key: "577d2f5b971dd09c01fbd6510959c091",
                    language: "pt-BR",
                    page: 1
                }
            })

            console.log(response.data.results);
        }

        loadFilmes();
    }, []);


    return(
        <div>
            <h1>Bem Vindo a HOME</h1>
        </div>
    )
}


export default Home;