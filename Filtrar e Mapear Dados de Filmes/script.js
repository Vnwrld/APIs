const API_KEY = 70e22129;
const BASE_URL = 'https://www.omdbapi.com/';


let filmes = [];

async function buscarFilme(titulo) {
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${titulo}`);
        const data = await response.json();
        
        if (data.Response === "True") {
            filmes.push({
                titulo: data.Title,
                ano: parseInt(data.Year),
                diretor: data.Director
            });
        } else {
            console.error("Filme não encontrado");
        }
    } catch (error) {
        console.error("Erro ao buscar filme", error);
    }
}

function filtrarFilmesApos2000() {
    return filmes.filter(filme => filme.ano > 2000);
}

function exibirFilmes() {
    const filmesFiltrados = filtrarFilmesApos2000();
    const listaFilmes = document.getElementById("lista-filmes");
    listaFilmes.innerHTML = "";
    
    filmesFiltrados.map(filme => {
        const item = document.createElement("li");
        item.textContent = `${filme.titulo} (${filme.ano}) - Diretor: ${filme.diretor}`;
        listaFilmes.appendChild(item);
    });
}

async function adicionarFilme() {
    const tituloInput = document.getElementById("titulo-filme").value;
    if (tituloInput.trim() !== "") {
        await buscarFilme(tituloInput);
        exibirFilmes();
        document.getElementById("titulo-filme").value = "";
    }
}

window.adicionarFilme = adicionarFilme;