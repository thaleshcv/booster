import React, { Fragment, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import WatchedIcon from '@material-ui/icons/Done';
import WatchedBorderIcon from '@material-ui/icons/DoneOutline';

import MovieGenres from './MovieGenres';

import { getPosterUrl, getMovie } from '../../lib/tmdb';
import {
	createFavorite,
	deleteFavorite,
	setFavoriteWatched
} from '../../lib/favorites';

import useApp from '../../actions/app';
import useFlash from '../../actions/flash';
import useFavorites from '../../actions/favorites';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	spacer: {
		margin: theme.spacing(2, 0)
	},
	poster: {
		minWidth: 342,
		height: 'auto'
	},
	right: {
		padding: theme.spacing(0, 1)
	},
	progress: {
		minHeight: 400,
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	favoriteIcon: {
		fontSize: '1.5em',
		color: red['500']
	},
	watchIcon: {
		fontSize: '1.5em',
		color: green['500']
	}
}));

function Movies({ currentUser, dispatch, movieId, favoriteId, watched }) {
	const classes = useStyles();

	const [movie, setMovie] = useState();

	const { setLoading } = useApp(dispatch);
	const { addFlashMessage } = useFlash(dispatch);
	const { addFavorites, updateFavorite, removeFavorite } = useFavorites(
		dispatch
	);

	useEffect(() => {
		setLoading(true);

		getMovie(movieId)
			.then(movie => {
				setMovie(movie);
			})
			.finally(() => {
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
		if (!currentUser) {
			addFlashMessage('You have to log in first');
			return;
		}

		if (favoriteId) {
			deleteFavorite(favoriteId)
				.then(() => removeFavorite(favoriteId))
				.then(() => addFlashMessage('Movie removed from favorites'));
		} else {
			createFavorite(movie)
				.then(favorite => addFavorites(favorite))
				.then(() => addFlashMessage('Movie added to favorites'));
		}
	};

	if (!movie) {
		return null;
	}

	const FavIcon = favoriteId ? FavoriteIcon : FavoriteBorderIcon;
	const WatchIcon = watched ? WatchedIcon : WatchedBorderIcon;

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
					<Grid
						className={classes.spacer}
						alignItems='center'
						spacing={1}
						container>
						<Grid style={{ flex: 1 }} item>
							<Typography variant='h2'>{movie.title}</Typography>
						</Grid>
						<Grid item>
							<IconButton
								title={
									favoriteId ? 'Remove from favorites' : 'Add to favorites'
								}
								onClick={handleFavorite}>
								<FavIcon className={classes.favoriteIcon} />
							</IconButton>
							<IconButton
								disabled={!favoriteId}
								title={`Set movie as${watched ? ' not ' : ' '}watched`}
								onClick={handleWatch}>
								<WatchIcon className={classes.watchIcon} />
							</IconButton>
						</Grid>
					</Grid>
					<Typography variant='body1' color='textSecondary' paragraph>
						{movie.tagline}
					</Typography>
					<Typography variant='body1' paragraph>
						{movie.overview}
					</Typography>

					<div className={classes.spacer}>
						<MovieGenres genres={movie.genres} />
					</div>

					<Grid spacing={2} container>
						<Grid xs={12} md={4} item>
							<Typography color='textSecondary' variant='body2'>
								Released: {movie.release_date}
							</Typography>
						</Grid>
						<Grid xs={12} md={4} item>
							<Typography color='textSecondary' variant='body2'>
								From: {movie.production_countries.map(c => c.name).join(', ')}
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

export default Movies;
