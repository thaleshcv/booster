import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { getProfileUrl } from "../../lib/tmdb";

const CAST_LIMIT = 5;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "safe space-between"
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

function MovieCast({ cast }) {
	const classes = useStyles();
	const [fullCast, setFullCast] = useState(false);

	if (!cast || !cast.length) {
		return <Typography color='error'>Cast not available</Typography>;
	}

	const castList = fullCast ? [...cast] : cast.slice(0, CAST_LIMIT);

	return (
		<div className={classes.root}>
			{castList.map(cast => (
				<div className={classes.avatarWrapper} key={cast.credit_id}>
					<Avatar
						className={classes.avatar}
						alt={cast.name}
						src={getProfileUrl(cast.profile_path)}
					/>
					<Typography variant='caption' color='textSecondary'>
						{cast.name}
					</Typography>
					<br />
					<Typography variant='caption' color='textPrimary'>
						{cast.character}
					</Typography>
				</div>
			))}

			{fullCast ? (
				<div className={classes.avatarWrapper}>
					<Avatar className={classes.avatarIcon}>
						<ChevronLeftIcon />
					</Avatar>
					<Button
						size='small'
						variant='text'
						color='secondary'
						onClick={() => setFullCast(false)}>
						Show less
					</Button>
				</div>
			) : (
				<div className={classes.avatarWrapper}>
					<Avatar className={classes.avatarIcon}>
						+{cast.length - castList.length}
					</Avatar>
					<Button
						size='small'
						variant='text'
						color='secondary'
						onClick={() => setFullCast(true)}>
						Show more
					</Button>
				</div>
			)}
		</div>
	);
}

export default MovieCast;
