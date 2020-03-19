import axios from "axios";

// initializing TMDB client
const client = axios.create({
	baseURL: process.env.REACT_APP_MOVIEDB_URL,
	params: {
		api_key: process.env.REACT_APP_MOVIEDB_KEY
	}
});

client.interceptors.response.use(function(response) {
	return response["data"];
});

/**
 * Get movies.
 *
 * @param {Object} params
 */
export function getMovies(params = {}) {
	return client.get("/discover/movie", {
		params: {
			...params,
			include_adult: false
		}
	});
}

/**
 * Search for movies.
 *
 * @param {Object} params
 */
export function searchMovies(params = {}) {
	return client.get("/search/movie", {
		params: {
			...params,
			include_adult: false
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
 * Get collection details by id.
 *
 * @param {String} collectionId
 * @param {Object} params
 */
export function getCollection(collectionId, params = {}) {
	return client.get(`/collection/${collectionId}`, { params });
}

/**
 * Build the URI for a backdrop image.
 *
 * @param {String} path Backdrop image path.
 * @param {Number} size Backdrop size (one of 300, 780, 1280).
 */
export function getBackdropUrl(path, size) {
	return `${process.env.REACT_APP_MOVIEDB_IMAGES_PATH}/w${size || 780}/${path}`;
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

/**
 * Build the URI for a profile image.
 *
 * @param {String} path Profile image path.
 * @param {Number} size Profile size (one of 45, 185).
 */
export function getProfileUrl(path, size) {
	return `${process.env.REACT_APP_MOVIEDB_IMAGES_PATH}/w${size || 45}/${path}`;
}
