import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FastForwardIcon from '@material-ui/icons/FastForward';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

function Pagination({ currentPage, pages, onPaginate }) {
	return (
		<Box textAlign='center'>
			<Typography variant='body1'>
				Page {currentPage} of {pages}
			</Typography>
			<IconButton onClick={() => onPaginate(1)} disabled={currentPage <= 1}>
				<FastRewindIcon />
			</IconButton>
			<IconButton
				onClick={() => onPaginate(currentPage - 1)}
				disabled={currentPage <= 1}>
				<ChevronLeftIcon />
			</IconButton>
			<IconButton
				onClick={() => onPaginate(currentPage + 1)}
				disabled={currentPage >= pages}>
				<ChevronRightIcon />
			</IconButton>
			<IconButton
				onClick={() => onPaginate(pages)}
				disabled={currentPage >= pages}>
				<FastForwardIcon />
			</IconButton>
		</Box>
	);
}

export default Pagination;
