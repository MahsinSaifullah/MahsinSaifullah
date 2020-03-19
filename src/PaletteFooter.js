import React from 'react';
import styles from './styles/PaletteFooterStyles';
import { withStyles } from '@material-ui/core/styles';

const PaletteFooter = props => {
	const { paletteName, emoji, classes } = props;

	return (
		<footer className={classes.footerContainer}>
			{paletteName} <span className={classes.footerEmoji}>{emoji}</span>
		</footer>
	);
};

export default withStyles(styles)(PaletteFooter);
