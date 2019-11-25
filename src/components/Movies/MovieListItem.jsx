import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/core/styles';

import { getPosterUrl } from '../../lib/movies';

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
		justifyContent: 'space-between'
	},
	controls: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	},
	title: {
		fontWeight: theme.typography.fontWeightMedium
	}
}));

function MovieListItem({ movie }) {
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.media}
				title={movie.title}
				image={getPosterUrl(movie.poster_path, 185)}
			/>
			<CardContent className={classes.content}>
				<Link component={RouterLink} to={`/movies/${movie.id}/${movie.title}`}>
					<Typography className={classes.title} variant='body1'>
						{movie.title}
					</Typography>
				</Link>
				<CardActions className={classes.controls}>
					<IconButton>
						<FavoriteBorderIcon />
					</IconButton>
				</CardActions>
			</CardContent>
		</Card>
	);
}

export default MovieListItem;
