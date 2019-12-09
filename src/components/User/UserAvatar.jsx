import React from 'react';
import Avatar from '@material-ui/core/Avatar';

function UserAvatar({ src, name, email }) {
	return (
		<Avatar src={src} variant='rounded'>
			{(name || email).charAt(0)}
		</Avatar>
	);
}

export default UserAvatar;
