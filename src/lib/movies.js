import axios from 'axios';

const year = new Date().getFullYear();

// initializing TMDB client
const client = axios.create({
	baseURL: process.env.REACT_APP_MOVIEDB_URL,
	params: {
		api_key: process.env.REACT_APP_MOVIEDB_KEY
	}
});

client.interceptors.response.use(function(response) {
	return response['data'];
});

/**
 * Get movies.
 *
 * @param {Object} params
 */
export function getMovies(params = {}) {
	return client.get('/discover/movie', {
		params: {
			...params,
			include_adult: false,
			year
		}
	});
}

/**
 * Get the primary information about a movie.
 *
 * @param {String} movieId
 * @param {Object} params
 */
export function getMovie(movieId, params = {}) {
	return client.get(`/movie/${movieId}`, { params });
}

/**
 * Build the URI for a poster image.
 *
 * @param {String} path Poster image path.
 * @param {Number} size Poster size (one of 92, 154, 185, 342, 500, 780).
 */
export function getPosterUrl(path, size) {
	return `${process.env.REACT_APP_MOVIEDB_IMAGES_PATH}/w${size || 500}/${path}`;
}
