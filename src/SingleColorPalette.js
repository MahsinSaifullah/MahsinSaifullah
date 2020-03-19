import React, { Component } from 'react';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';
import { Link } from 'react-router-dom';
import styles from './styles/PaletteStyles';
import { withStyles } from '@material-ui/styles';

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this.state = {
			colorFormat: 'hex'
		};

		this._shade = this.gatherShades(
			this.props.palette.color,
			this.props.colorId
		);
	}

	gatherShades = (paletteColors, colorToFilterBy) => {
		let shades = [];

		for (let key in paletteColors) {
			shades = shades.concat(
				paletteColors[key].filter(color => color.id === colorToFilterBy)
			);
		}

		return shades.slice(1);
	};

	changeFormat = evt => {
		this.setState({ colorFormat: evt.target.value });
	};

	render() {
		const { colorFormat } = this.state;
		const { classes } = this.props;
		const { paletteName, emoji, id } = this.props.palette;
		const colorBoxes = this._shade.map(color => (
			<ColorBox
				background={color[colorFormat]}
				name={color.name}
				key={color.name}
				showMoreLink={false}
			/>
		));
		return (
			<div className={classes.palette}>
				<Navbar changeFormat={this.changeFormat} showSlider={false} />
				<div className={classes.colors}>
					{colorBoxes}
					<div className={classes.goBack}>
						<Link to={`/palette/${id}`}>Go Back</Link>
					</div>
				</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
