import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { getProfileUrl } from '../../lib/tmdb';

const useStyles = makeStyles(theme => ({
	root: {},
	avatar: {
		display: 'inline-block',
		margin: theme.spacing(0, 1)
	}
}));

function MovieCast({ cast, limit }) {
	const classes = useStyles();

	const castList =
		Number.isInteger(limit) && limit > 0 ? cast.slice(0, limit) : cast;

	return (
		<div className={classes.root}>
			{castList.map(person => (
				<Tooltip
					placement='top'
					key={person.cast_id}
					title={
						<Typography color='inherit'>
							{person.name} as <i>{person.character}</i>
						</Typography>
					}>
					<Avatar
						className={classes.avatar}
						src={getProfileUrl(person.profile_path, 45)}>
						<img src='/assets/profile.png' alt={person.name} />
					</Avatar>
				</Tooltip>
			))}

			{castList.length < cast.length && (
				<Avatar className={classes.avatar}>+{cast.length - limit}</Avatar>
			)}
		</div>
	);
}

export default MovieCast;
