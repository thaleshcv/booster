import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import MovieCastItem from "./MovieCastItem";
import { getProfileUrl } from "../../lib/tmdb";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexFlow: "row wrap"
	},
	avatar: {
		marginBottom: theme.spacing(1),
		width: 45,
		height: 45
	},
	avatarIcon: {
		marginBottom: theme.spacing(1),
		width: 45,
		height: 45,
		backgroundColor: theme.palette.secondary.light
	},
	avatarWrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(0, 2, 2, 0),
		width: "100px",
		textAlign: "center"
	}
}));

function CastInfo({ name, character }) {
	return (
		<div>
			<Typography variant='caption' color='textSecondary'>
				{name}
			</Typography>
			<br />
			<Typography variant='caption' color='textPrimary'>
				{character}
			</Typography>
		</div>
	);
}

function MovieCast({ cast }) {
	const classes = useStyles();

	if (!cast || !cast.length) {
		return <Typography color='error'>Cast not available</Typography>;
	}

	return (
		<div className={classes.root}>
			{cast.map(person => (
				<MovieCastItem
					key={person.credit_id}
					alt={person.name}
					src={getProfileUrl(person.profile_path)}
					footer={<CastInfo name={person.name} character={person.character} />}
				/>
			))}
		</div>
	);
}

export default MovieCast;
