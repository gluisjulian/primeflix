import { useEffect, useState } from 'react';
import { useParams, useNavigate, json } from 'react-router-dom';
import api from '../../api/Api';


import "../Filme/filme-info.css";




function Filme(){


    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect( ()=> {
        async function loadFilme(){
            await api.get(`movie/${id}`, {
                params: {
                    api_key: "577d2f5b971dd09c01fbd6510959c091",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Filme nao encontrado.")
                navigate("/", {replace: true});
                return;
            })

        }

        loadFilme();

        return() => {
            console.log("Componente desmontado.")
        }
    }, [id, navigate])


    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];
        const filmeExists = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(filmeExists){
            alert("Filme ja consta na lista de filmes.");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso!");
    }


    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes do filme...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>
            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}


export default Filme;