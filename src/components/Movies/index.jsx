import React, { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import WatchedIcon from "@material-ui/icons/DoneOutline";

import MovieCast from "./MovieCast";
import MovieCollection from "./MovieCollection";
import MovieGenres from "./MovieGenres";
import MovieInfo from "./MovieInfo";

import { getBackdropUrl, getMovie, getCollection } from "../../lib/tmdb";

import {
	createFavorite,
	deleteFavorite,
	setFavoriteWatched
} from "../../lib/favorites";

import useApp from "../../actions/app";
import useFlash from "../../actions/flash";
import useFavorites from "../../actions/favorites";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "column"
	},
	backdrop: {
		"width": "100%",
		"display": "flex",
		"justifyContent": "center",
		"alignItems": "flex-start",
		"maxHeight": "400px",
		"overflow": "hidden",
		"& > img": {
			width: "100%",
			height: "auto"
		}
	},
	spacer: {
		margin: theme.spacing(2, 0)
	},
	poster: {
		"minWidth": 342,
		"& > img": {
			width: "100%"
		}
	},
	content: {
		"padding": theme.spacing(0, 1),
		"display": "flex",
		"& > *": {
			margin: theme.spacing(1, 0)
		}
	},
	contentRight: {
		flex: 1
	},
	contentLeft: {
		width: "330px"
	},
	progress: {
		minHeight: 400,
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
}));

const useActionStyles = makeStyles(theme => ({
	actionBtn: {
		"margin": theme.spacing(0, 1),
		"backgroundColor": grey["200"],
		"&.active": {
			color: theme.palette.common.white,
			backgroundColor: blue["700"]
		}
	}
}));

function ActionBtn({ Icon, active, ...props }) {
	const classes = useActionStyles();

	const classNames = [classes.actionBtn];
	if (active) {
		classNames.push("active");
	}

	return (
		<IconButton {...props} className={classNames.join(" ")}>
			<Icon />
		</IconButton>
	);
}

const useCastStyles = makeStyles(theme => ({
	spacer: {
		margin: theme.spacing(2, 0)
	},
	castWrapper: {
		maxHeight: "200px",
		overflowY: "auto",
		overflowX: "hidden"
	}
}));

function CastSection({ cast }) {
	const classes = useCastStyles();

	if (!cast || !cast.length) return null;

	return (
		<div className={classes.spacer}>
			<Typography variant='h4'>Cast</Typography>
			<div className={classes.castWrapper}>
				<MovieCast cast={cast} />
			</div>
		</div>
	);
}

const useCollectionStyles = makeStyles(theme => ({
	spacer: {
		margin: theme.spacing(2, 0)
	}
}));

function CollectionSection({ collection }) {
	const classes = useCollectionStyles();

	if (!collection) return null;

	return (
		<div className={classes.spacer}>
			<Typography variant='h4'>{collection.name}</Typography>
			<MovieCollection parts={collection.parts} />
		</div>
	);
}

function Movies({ authenticated, dispatch, movieId, favoriteId, watched }) {
	const classes = useStyles();

	const [movie, setMovie] = useState();
	const [collection, setCollection] = useState();

	const { setLoading } = useApp(dispatch);
	const { addFlashMessage } = useFlash(dispatch);
	const { addFavorites, updateFavorite, removeFavorite } = useFavorites(
		dispatch
	);

	const fetchCollection = collectionId =>
		getCollection(collectionId).then(collection => setCollection(collection));

	useEffect(() => {
		setLoading(true);

		let fetchedMovie;

		getMovie(movieId, { append_to_response: "videos,credits" })
			.then(movie => {
				fetchedMovie = movie;
				setMovie(movie);
			})
			.then(() => {
				if (fetchedMovie.belongs_to_collection) {
					fetchCollection(fetchedMovie.belongs_to_collection.id);
				}
			})
			.finally(() => {
				window.scrollTo(0, 0);
				setLoading(false);
			});
	}, [movieId, setLoading]);

	const handleWatch = () => {
		const newWatchedValue = !watched;

		setFavoriteWatched(favoriteId, newWatchedValue).then(() =>
			updateFavorite({
				id: favoriteId,
				watched: newWatchedValue
			})
		);
	};

	const handleFavorite = () => {
		if (!authenticated) {
			addFlashMessage("You have to log in first");
			return;
		}

		if (favoriteId) {
			deleteFavorite(favoriteId)
				.then(() => removeFavorite(favoriteId))
				.then(() => addFlashMessage("Movie removed from favorites"));
		} else {
			createFavorite(movie)
				.then(favorite => addFavorites(favorite))
				.then(() => addFlashMessage("Movie added to favorites"));
		}
	};

	if (!movie) {
		return null;
	}

	return (
		<Fragment>
			<div className={classes.root}>
				<div className={classes.backdrop}>
					<img
						src={getBackdropUrl(movie.backdrop_path, 1280)}
						title='Poster'
						alt='Poster'
					/>
				</div>

				<Grid alignItems='center' spacing={1} container>
					<Grid style={{ flex: 1 }} item>
						<Typography variant='h2'>{movie.title}</Typography>
					</Grid>
					<Grid item>
						<ActionBtn
							title={`${favoriteId ? "Remove from" : "Add to"} favorites`}
							Icon={FavoriteIcon}
							active={Boolean(favoriteId)}
							onClick={handleFavorite}
						/>
						<ActionBtn
							title={`Movie${watched ? " " : " not "}watched`}
							Icon={WatchedIcon}
							disabled={!favoriteId}
							active={watched}
							onClick={handleWatch}
						/>
					</Grid>
				</Grid>

				<div className={classes.content}>
					<div className={classes.contentLeft}>
						<MovieGenres genres={movie.genres} />
						<MovieInfo
							crew={movie.credits.crew}
							releaseDate={movie.release_date}
							countries={movie.production_countries}
							runtime={movie.runtime}
						/>
					</div>
					<div className={classes.contentRight}>
						<Typography variant='body1' color='textSecondary' paragraph>
							{movie.tagline}
						</Typography>
						<Typography variant='body1' paragraph>
							{movie.overview}
						</Typography>

						<CastSection cast={movie.credits.cast} />
						<CollectionSection collection={collection} />
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Movies;
