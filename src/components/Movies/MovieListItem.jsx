import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { getPosterUrl } from '../../lib/tmdb';

const useStyles = makeStyles(theme => ({
	card: {
		display: 'flex',
		maxWidth: 370,
		margin: theme.spacing(2)
	},
	media: {
		flex: 1,
		width: 185,
		height: 278
	},
	content: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingBottom: '8px !important'
	},
	controls: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		padding: 0,
		margin: 0
	},
	title: {
		fontWeight: theme.typography.fontWeightMedium
	}
}));

function MovieListItem({ movieId, title, posterPath, actions }) {
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.media}
				title={title}
				image={getPosterUrl(posterPath, 185)}
			/>
			<CardContent className={classes.content}>
				<Link component={RouterLink} to={`/movies/${movieId}/${title}`}>
					<Typography className={classes.title} variant='body1'>
						{title}
					</Typography>
				</Link>
				<CardActions className={classes.controls}>{actions}</CardActions>
			</CardContent>
		</Card>
	);
}

export default MovieListItem;
