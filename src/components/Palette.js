import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from '../styles/PaletteStyles';
import { withStyles } from '@material-ui/core/styles';

class Palette extends Component {
	state = {
		level: 500,
		colorFormat: 'hex'
	};

	changeLevel = level => {
		this.setState({ level });
	};

	changeFormat = evt => {
		this.setState({ colorFormat: evt.target.value });
	};

	render() {
		const { color, paletteName, emoji, id } = this.props.palette;
		const { classes } = this.props;
		const { level, colorFormat } = this.state;
		const colorBoxes = color[level].map(color => (
			<ColorBox
				background={color[colorFormat]}
				name={color.name}
				key={color.id}
				colorId={color.id}
				paletteId={id}
				showMoreLink
			/>
		));
		return (
			<div className={classes.palette}>
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					changeFormat={this.changeFormat}
					showSlider
				/>
				<div className={classes.colors}>{colorBoxes}</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(Palette);
