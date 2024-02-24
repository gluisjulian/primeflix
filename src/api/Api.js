import axios from "axios";

//baseURL: 'https://api.themoviedb.org/3';

const Api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});


export default Api;