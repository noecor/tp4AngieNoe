console.log('Hola');
const apiKey = `3631da5fba4115a4ce320e971a2fdadb`;
const page = 1;
const url = `https://image.tmdb.org/t/p/original`;
const body = document.querySelector('body');

//recibe categoria por parámetro e imprime resultados por categoria. Se llama a la función con onclick.
const searchCategory = (category) => {
    let title = document.getElementById("title");
    switch (category) {
        case 'popular':
            title.textContent = 'Popular Movies';
            break;
        case 'top_rated':
            title.textContent = 'Top Rated';
            break;
        case 'upcoming':
            title.textContent = 'Upcoming';
            break;
        case 'now_playing':
            title.textContent = 'Now Playing';
            break;
    }
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
        .then((res) => res.json())            
		.then((res) => printCategoryResults(res.results));
};

//imprime los resultados de la categoría y las muestra en una link por cada una.
const printCategoryResults = (movies) => {
    let container = document.getElementById('movies');
    container.classList.add('movies')
    container.innerHTML = '';

	movies.forEach((mov) => {
		let movie = document.createElement('a');
        movie.innerText = mov.title;
        movie.innerHTML = `<li class=""
            <div class="imagen" onclick="openModal(${mov.id})"><img src="${url}${mov.poster_path}" width="80px"/></div>
            <div class=""  onclick="openModal(${mov.id})">${mov.title}</div>
            </li>`;
        container.appendChild(movie);
	});
};

//abre el modal con las características de cada película.
const openModal = id =>{
    fetch (`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
        .then(res => res.json())
        .then(movie => { 

            const genres = movie.genres.map(e=>e.name).join('/');

            let searchBar = document.getElementById('search');
            searchBar.style.display = "none";
            let mainText = document.getElementById('mainText');
            mainText.style.display = "none";

            const container = document.createElement('div');
            container.innerHTML = `
            <div class="modal" id="modal">
            <div class="">
            <div class="modalHeader" style="background-image: url(${url}${movie.backdrop_path})" width="200px"></div>
            <div class="modalInfo"></div>
            <div class="containerrModalInfo">
                <div class="modalPoster">
                    <img src="${url}${movie.poster_path}" width="300px"/>
                </div>
                <div class="modalInfoMovie">
                    <h4>${movie.title}</h4>
                    <p>${movie.tagline}</p>
                    <div class="masInfo">
                        <span>${movie.overview}</span>
                        <h5>genre</h5>
                        <p>${genres}</p>
                        <h5> release date</h5>
                        <p>${movie.release_date}</p>
                    </div>

                </div>
            </div>
            <div class="close" onclick= "closeModal()">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" 
                data-icon="times" class="svg-inline--fa fa-times fa-w-11" 
                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 
                12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 
                75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19
                 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 
                 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 
                 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
            </div>
            </div>
            </div>`

        body.appendChild(container);
        
    })
};

//función para cerrar el modal.
const closeModal = () =>{
    const container = document.getElementById('modal');
    container.remove('modal');
    let searchBar = document.getElementById('search');
    searchBar.style.display = "flex";
    let mainText = document.getElementById('mainText');
    mainText.style.display = "block";
}

//función para esconder elementos.
const hideElement = () =>{
    let elem = document.getElementById('mainImage');
    elem.style.display = "none";
    let elem2 = document.getElementById('viewAll');
    elem2.style.display ="none";
}

//función que busca películas con las letras ingresadas.
let lastRequest;
const search = () => {
let query = event.target.value;
    if (query.length >= 3 || (event.keyCode === 13 && query !== lastRequest)) {
lastRequest = query;
fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
    .then((res) => res.json())
    .then((res) => printQueryResults(res.results));
    }
};
//imprime los resultados de la búsqueda
const printQueryResults = (movies) => {
const container = document.getElementById('results');
container.innerHTML = '';
movies.forEach((mov) => {
let movie = document.createElement('a');
let title = mov.title === mov.original_title ? mov.title : `${mov.title} (${mov.original_title})`;
movie.innerText = title;
movie.href = '#';
movie.onclick = () => openModal(mov.id);
container.appendChild(movie);
    });
};

const burguerMenu = () => {
    const nav = document.getElementById('nav');
    nav.classList.remove('navigation-list');
    nav.classList.add = ('burguer');
}
const noBurguer = () => nav.classList.add('displayNone');