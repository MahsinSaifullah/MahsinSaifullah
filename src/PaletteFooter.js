import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	footerContainer: {
		backgroundColor: 'white',
		height: '5vh',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		fontWeight: 'bold'
	},
	footerEmoji: {
		fontSize: '1.5rem',
		margin: '0 1rem'
	}
};

const PaletteFooter = props => {
	const { paletteName, emoji, classes } = props;

	return (
		<footer className={classes.footerContainer}>
			{paletteName} <span className={classes.footerEmoji}>{emoji}</span>
		</footer>
	);
};

export default withStyles(styles)(PaletteFooter);
