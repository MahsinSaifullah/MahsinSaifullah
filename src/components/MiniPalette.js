import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

class MiniPalette extends PureComponent {
	state = {};

	deletePalette = e => {
		e.stopPropagation();
		this.props.deletePalette(this.props.id);
	};
	render() {
		const { classes, paletteName, emoji, colors, handleClick, id } = this.props;
		const minColorBoxes = colors.map(color => (
			<div
				className={classes.miniColor}
				style={{ backgroundColor: color.color }}
				key={color.name}
			/>
		));
		return (
			<div className={classes.root} onClick={() => handleClick(id)}>
				<DeleteIcon
					className={classes.deleteIcon}
					onClick={this.deletePalette}
					style={{ transition: 'all 0.3s ease-in-out' }}
				/>

				<div className={classes.colors}>{minColorBoxes}</div>
				<h5 className={classes.title}>
					{paletteName} <span className={classes.emoji}>{emoji}</span>
				</h5>
			</div>
		);
	}
}

export default withStyles(styles)(MiniPalette);
