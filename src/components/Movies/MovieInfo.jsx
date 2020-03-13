import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function getCrewMember(crew, job) {
	return crew.filter(c => c.job === job).map(c => c.name);
}

function MovieInfo({ crew, releaseDate, countries, runtime }) {
	const directors = getCrewMember(crew, "Director");
	const producers = getCrewMember(crew, "Producer");

	return (
		<Grid spacing={2} container>
			<Grid xs={12} md={4} item>
				<Typography color='textSecondary' variant='overline'>
					Released
				</Typography>
				<Typography color='textPrimary' variant='body2'>
					{releaseDate}
				</Typography>
			</Grid>
			<Grid xs={12} md={4} item>
				<Typography color='textSecondary' variant='overline'>
					From
				</Typography>
				<Typography color='textPrimary' variant='body2'>
					{countries.map(c => c.name).join(", ")}
				</Typography>
			</Grid>
			<Grid xs={12} md={4} item>
				<Typography color='textSecondary' variant='overline'>
					Runtime
				</Typography>
				<Typography color='textPrimary' variant='body2'>
					{runtime} minutes
				</Typography>
			</Grid>
			<Grid xs={12} md={4} item>
				<Typography color='textSecondary' variant='overline'>
					Directed by
				</Typography>
				<Typography color='textPrimary' variant='body2'>
					{directors.join(", ")}
				</Typography>
			</Grid>
			<Grid xs={12} md={8} item>
				<Typography color='textSecondary' variant='overline'>
					Produced by
				</Typography>
				<Typography color='textPrimary' variant='body2'>
					{producers.join(", ")}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default MovieInfo;
