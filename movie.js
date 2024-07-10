const apiKey = '1f77f182aa61a84651cef8498751a870'; 
document.addEventListener('DOMContentLoaded', () => {
    fetchMovies('now_playing', 'recent-grid');
    fetchMovies('popular', 'popular-grid');
    fetchMovies('top_rated', 'top-rated-grid');       // Fetch and display movies for different categories
    fetchMovies('upcoming', 'upcoming-grid');
});

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        searchMovies(query);  // Perform search if query is not empty
    }
});

async function fetchMovies(category, elementId) {
    const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`;
    const response = await fetch(url);   // Fetch data from TMDB API
    const data = await response.json();
    displayMovies(data.results, elementId);   // Display the fetched movies
}

async function searchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results, 'search-grid');
    document.getElementById('search-results').classList.remove('hidden');
}

function displayMovies(movies, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-tile');
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Released: ${movie.release_date.split('-')[0]}</p>
                <p>${movie.overview}</p>
            </div>
        `;
        container.appendChild(movieElement);
    });
}



