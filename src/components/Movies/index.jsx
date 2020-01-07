import React, { Fragment, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import WatchedIcon from '@material-ui/icons/DoneOutline';

import MovieInfo from './MovieInfo';
import MovieGenres from './MovieGenres';
import MovieCast from './MovieCast';

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
	content: {
		padding: theme.spacing(0, 1)
	},
	progress: {
		minHeight: 400,
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}));

const useActionStyles = makeStyles(theme => ({
	actionBtn: {
		margin: theme.spacing(0, 1),
		backgroundColor: grey['200'],
		'&.active': {
			color: theme.palette.common.white,
			backgroundColor: blue['700']
		}
	}
}));

function ActionBtn({ Icon, active, ...props }) {
	const classes = useActionStyles();

	const classNames = [classes.actionBtn];
	if (active) {
		classNames.push('active');
	}

	return (
		<IconButton {...props} className={classNames.join(' ')}>
			<Icon />
		</IconButton>
	);
}

function Movies({ authenticated, dispatch, movieId, favoriteId, watched }) {
	const classes = useStyles();

	const [movie, setMovie] = useState();
	const [fullCast, setFullCast] = useState(false);

	const { setLoading } = useApp(dispatch);
	const { addFlashMessage } = useFlash(dispatch);
	const { addFavorites, updateFavorite, removeFavorite } = useFavorites(
		dispatch
	);

	useEffect(() => {
		setLoading(true);

		getMovie(movieId, { append_to_response: 'videos,credits' })
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
		if (!authenticated) {
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

	return (
		<Fragment>
			<div className={classes.root}>
				<img
					className={classes.poster}
					src={getPosterUrl(movie.poster_path, 342)}
					title='Poster'
					alt='Poster'
				/>
				<div className={classes.content}>
					<Grid
						className={classes.spacer}
						alignItems='center'
						spacing={1}
						container>
						<Grid style={{ flex: 1 }} item>
							<Typography variant='h2'>{movie.title}</Typography>
						</Grid>
						<Grid item>
							<ActionBtn
								title={`${favoriteId ? 'Remove from' : 'Add to'} favorites`}
								Icon={FavoriteIcon}
								active={Boolean(favoriteId)}
								onClick={handleFavorite}
							/>
							<ActionBtn
								title={`Movie${watched ? ' ' : ' not '}watched`}
								Icon={WatchedIcon}
								disabled={!favoriteId}
								active={watched}
								onClick={handleWatch}
							/>
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

					<MovieInfo
						releaseDate={movie.release_date}
						countries={movie.production_countries}
						runtime={movie.runtime}
						crew={movie.credits.crew}
					/>

					<Grid alignItems='baseline' spacing={1} container>
						<Grid item>
							<Typography className={classes.spacer} variant='h4'>
								Cast
							</Typography>
						</Grid>
						<Grid item>
							<Button onClick={() => setFullCast(!fullCast)} size='small'>
								{fullCast ? 'Show less' : 'Show more'}
							</Button>
						</Grid>
					</Grid>
					<MovieCast cast={movie.credits.cast} limit={fullCast ? 0 : 12} />
				</div>
			</div>
		</Fragment>
	);
}

export default Movies;
