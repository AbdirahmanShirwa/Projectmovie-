const inputField = document.querySelector('.movie__search');
const boxes = document.querySelector('main');
let aboutUs = document.querySelector('.about__movie');

inputField.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        const searchMovie = inputField.value;
        boxes.innerHTML = '';
        loadMovies(searchMovie);
    }
    e.preventDefault();
});

const loadMovies = (searchMovie) => {
    fetch(`https://www.omdbapi.com/?s=${searchMovie}&apikey=19ec95fc`)
    .then(response => 
        {
            if(!response.ok)
                throw new Error(`Status Code Error: ${response.status}`);
            response.json()
            .then((data => {
                    showMovies(data.Search);
            }));
        })
        .catch((err) => {
            console.log('Something wrong!');
            console.log(err);
        })
}
const showMovies = (movies) => {
    if(movies === undefined)
    {
        alert('Movie doesnt exist');
    } else {
        movies.forEach((movie) => {
            const {Title, Year, Poster, imdbID} = movie;
            const movieBox = document.createElement('div');
            movieBox.classList.add('box');
            boxes.appendChild(movieBox);

            let imgPoster = Poster === 'N/A' ? 'images/na.jpeg' : Poster;
            movieBox.innerHTML = `
            <img src="${imgPoster}" width="100%"/ alt="${Title}" onClick="movieSelected('${imdbID}')">
                <p>${Title} (${Year})</p>
                `;
        });
    }
}
const movieSelected = (imdbID) => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=19ec95fc`)
    .then(response => 
        {
            if(!response.ok)
                throw new Error(`Status Code Error: ${response.status}`);
            response.json()
            .then((data => {
                    let { Poster, Title, Released, BoxOffice, Genre, imdbRating, Actors } = data;
                    aboutUs.style.display = 'block';


                    let card = document.createElement('div');
                    let btn = document.createElement('button');

                    card.classList.add('about__movie__card');
                    aboutUs.appendChild(card);
                
                    document.querySelector('#Poster').src = ` ${Poster}`;
                    document.querySelector('#movie_name').innerHTML = ` ${Title}`;
                    document.querySelector('#movie_released').innerHTML = ` ${Released}`;
                    document.querySelector('#movie_boxOffice').innerHTML = ` ${BoxOffice}`;
                    document.querySelector('#movie_imdb').innerHTML = ` ${imdbRating}`;
                    document.querySelector('#movie_genre').innerHTML = ` ${Genre}`;
                    document.querySelector('#movie_actors').innerHTML = ` ${Actors}`;

            }));
        })
        .catch((err) => {
            console.log('Something wrong!');
            console.log(err);
        })
    }
const closeWindow = () => {
        aboutUs.style.display = 'none';
        const card = document.querySelector('.card');
}