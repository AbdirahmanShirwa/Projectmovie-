//  Here we  modify the values of the arrays
const inputField = document.querySelector('.movie__search');
const boxes = document.querySelector('main');
let aboutUs = document.querySelector('.about__movie');


// We added enter key for searching movies
inputField.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        const searchMovie = inputField.value;
        boxes.innerHTML = '';
        loadMovies(searchMovie);
    }
    e.preventDefault();
});

// If the search value is found in the Api it will show the movie.Otherwise i will alert No movie found

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
            console.log('Opps something went Wrong !');
            console.log(err);
        })
}
const showMovies = (movies) => {
    if(movies === undefined)
    {
        alert('No movies found');
    } else {
        movies.forEach((movie) => {
            const {Title, Year, Poster, imdbID} = movie;
            const movieBox = document.createElement('div');
            movieBox.classList.add('box');
            boxes.appendChild(movieBox);

           
            movieBox.innerHTML = `
            <img src="${imgPoster}" width="100%"/ alt="${Title}" onClick="movieSelected('${imdbID}')">
                <p>${Title} (${Year})</p>
                `;
        });
    }
}
// If the user clicks the Movie it will show the information about the movie
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
    // Here the user can close the window about detailed information of the movie
const closeWindow = () => {
        aboutUs.style.display = 'none';
        const card = document.querySelector('.card');
}

