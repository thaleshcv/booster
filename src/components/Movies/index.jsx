import React, { Fragment, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import VoteAverage from './VoteAverage';

import { getPosterUrl, getMovie } from '../../lib/tmdb';
import {
	createFavorite,
	deleteFavorite,
	setFavoriteWatched
} from '../../lib/favorites';

import useFavorites from '../../actions/favorites';
import useFlash from '../../actions/flash';

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
	const [loading, setLoading] = useState(false);

	const { addFavorites, updateFavorite, removeFavorite } = useFavorites(
		dispatch
	);

	const { addFlashMessage } = useFlash(dispatch);

	useEffect(() => {
		setLoading(true);

		getMovie(movieId)
			.then(movie => {
				setMovie(movie);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [movieId]);

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
							<IconButton
								title={
									favoriteId ? 'Remove from favorites' : 'Add to favorites'
								}
								onClick={handleFavorite}>
								<FavIcon className={classes.favoriteIcon} />
							</IconButton>
							{favoriteId && (
								<IconButton
									title={`Set movie as${watched ? ' not ' : ' '}watched`}
									onClick={handleWatch}>
									<WatchIcon className={classes.watchIcon} />
								</IconButton>
							)}
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
								From: {movie.production_countries.map(c => c.name).join(', ')}
							</Typography>
						</Grid>
						<Grid xs={12} md={4} item>
							<Typography align='right' color='textSecondary' variant='body2'>
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
