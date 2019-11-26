import React, { Fragment, useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import VoteAverage from './VoteAverage';
import { getPosterUrl, getMovie } from '../../lib/movies';

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
	}
}));

function Movie({ movieId }) {
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

					<div className={classes.genres}>
						<span>
							{movie.genres.map(g => (
								<Chip key={g.id} label={g.name} />
							))}
						</span>
					</div>

					<Typography variant='body1' color='textSecondary' paragraph>
						{movie.tagline}
					</Typography>
					<Typography variant='body1' paragraph>
						{movie.overview}
					</Typography>

					<Grid container>
						<Grid xs={12} md={6} item>
							<Typography color='textSecondary' variant='body2'>
								From: {movie.production_countries.map(c => c.name)}
							</Typography>
						</Grid>
						<Grid xs={12} md={6} item>
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

export default Movie;
