import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TimerIcon from '@material-ui/icons/AccessTime';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';

import { getPosterUrl } from '../../lib/tmdb';

const useStyles = makeStyles(theme => ({
	card: {
		display: 'flex',
		alignItems: 'stretch',
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
		padding: 0,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		'&:last-child': {
			paddingBottom: 0
		}
	},
	controls: {
		padding: 0,
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	},
	title: {
		fontWeight: theme.typography.fontWeightMedium,
		padding: theme.spacing(1)
	},
	notWatchedBtn: {
		color: orange[500]
	},
	watchedBtn: {
		color: green[500]
	}
}));

function FavoriteListItem({
	id,
	title,
	posterPath,
	backdropPath,
	movieId,
	watched,
	onDelete,
	onWatched
}) {
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
				<CardActions className={classes.controls}>
					<IconButton
						color='secondary'
						title='Remove from favorites'
						onClick={() => onDelete(id)}>
						<DeleteIcon />
					</IconButton>
					{watched ? (
						<Button
							className={classes.watchedBtn}
							size='small'
							title='Mark as not watched'
							onClick={() => onWatched(id, !watched)}
							endIcon={<DoneIcon />}>
							Watched
						</Button>
					) : (
						<Button
							className={classes.notWatchedBtn}
							size='small'
							title='Mark as watched'
							onClick={() => onWatched(id, !watched)}
							endIcon={<TimerIcon />}>
							Waiting
						</Button>
					)}
				</CardActions>
			</CardContent>
		</Card>
	);
}

export default FavoriteListItem;
