import React, { Fragment, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import MovieGenres from '../components/Movies/MovieGenres';
import VoteAverage from '../components/Movies/VoteAverage';
import { getPosterUrl, getMovie } from '../lib/tmdb';
import { createFavorite, deleteFavorite } from '../lib/favorites';

import { actions } from '../reducer';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	genres: {
		margin: theme.spacing(1, 0)
	},
	poster: {
		minWidth: 342,
		height: 'auto'
	},
	right: {
		padding: theme.spacing(0, 1)
	},
	title: {
		flex: 1,
		paddingTop: theme.spacing(1),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	progress: {
		minHeight: 400,
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	favoriteIcon: {
		fontSize: '1.5em'
	}
}));

function Movie({ dispatch, movieId, favoriteId }) {
	const classes = useStyles();

	const [movie, setMovie] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		getMovie(movieId)
			.then(movie => {
				setMovie(movie);
			})
			.catch(response => {
				console.error('failed', response);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [movieId]);

	const handleFavorite = () => {
		if (favoriteId) {
			deleteFavorite(favoriteId).then(() => {
				dispatch({
					type: actions.REMOVE_FAVORITE,
					payload: favoriteId
				});
			});
		} else {
			createFavorite(movie).then(favorite => {
				dispatch({
					type: actions.ADD_FAVORITES,
					payload: favorite
				});
			});
		}
	};

	if (loading) {
		return (
			<div className={classes.progress}>
				<CircularProgress />
			</div>
		);
	}

	if (!movie) {
		return null;
	}

	const FavIcon = favoriteId ? FavoriteIcon : FavoriteBorderIcon;

	return (
		<Fragment>
			<div className={classes.root}>
				<img
					className={classes.poster}
					src={getPosterUrl(movie.poster_path, 342)}
					title='Poster'
					alt='Poster'
				/>
				<div className={classes.right}>
					<Typography
						className={classes.title}
						variant='h2'
						color='textPrimary'>
						{movie.title}
						<VoteAverage value={movie.vote_average} />
					</Typography>

					<Grid
						alignItems='center'
						className={classes.genres}
						spacing={1}
						container>
						<Grid style={{ flex: 1 }} item>
							<MovieGenres genres={movie.genres} />
						</Grid>

						<Grid item>
							<IconButton onClick={handleFavorite}>
								<FavIcon className={classes.favoriteIcon} />
							</IconButton>
						</Grid>
					</Grid>

					<Typography variant='body1' color='textSecondary' paragraph>
						{movie.tagline}
					</Typography>
					<Typography variant='body1' paragraph>
						{movie.overview}
					</Typography>

					<Grid container>
						<Grid xs={12} md={4} item>
							<Typography color='textSecondary' variant='body2'>
								Released: {movie.release_date}
							</Typography>
						</Grid>

						<Grid xs={12} md={4} item>
							<Typography color='textSecondary' variant='body2'>
								From: {movie.production_countries.map(c => c.name)}
							</Typography>
						</Grid>
						<Grid xs={12} md={4} item>
							<Typography color='textSecondary' variant='body2'>
								Runtime: {movie.runtime} minutes
							</Typography>
						</Grid>
					</Grid>
				</div>
			</div>
		</Fragment>
	);
}

export default Movie;
