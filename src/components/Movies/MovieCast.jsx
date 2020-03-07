import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { getProfileUrl } from "../../lib/tmdb";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "safe space-between"
	},
	avatarWrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(0, 2, 2, 0)
	}
}));

function MovieCast({ cast }) {
	const classes = useStyles();
	const castList = (cast || []).slice(0, 7);

	return (
		<div className={classes.root}>
			{castList.map(cast => (
				<div className={classes.avatarWrapper} key={cast.credit_id}>
					<Avatar alt={cast.name} src={getProfileUrl(cast.profile_path)} />
					<Typography variant='caption' color='textSecondary'>
						{cast.name}
					</Typography>
					<br />
					<Typography variant='caption' color='textPrimary'>
						{cast.character}
					</Typography>
				</div>
			))}
		</div>
	);
}

export default MovieCast;
