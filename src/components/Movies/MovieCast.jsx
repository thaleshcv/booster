import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';

import { getProfileUrl } from '../../lib/tmdb';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper
	},
	gridList: {
		flexWrap: 'nowrap',
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: 'translateZ(0)'
	},
	title: {
		color: theme.palette.primary.light
	},
	profile: {
		width: '45px',
		height: 'auto'
	},
	titleBar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
	}
}));

function MovieCast({ cast }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<GridList className={classes.gridList} cols={2.5}>
				{cast.map(person => (
					<GridListTile key={person.credit_id}>
						<img
							className={classes.profile}
							src={getProfileUrl(person.profile_path, 45)}
							alt={person.name}
						/>
						<GridListTileBar
							title={person.name}
							classes={{
								root: classes.titleBar,
								title: classes.title
							}}
						/>
					</GridListTile>
				))}
			</GridList>
		</div>
	);
}

export default MovieCast;
