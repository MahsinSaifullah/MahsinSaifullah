import React, { Component } from 'react';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

const styles = {
	palette: {
		height: '100vh',
		display: 'flex',
		flexDirection: 'column'
	},
	colors: {
		height: '90%'
	},
	goBack: {
		backgroundColor: 'black',
		width: '20%',
		height: '50%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-3.5px',
		'& a': {
			width: '100px',
			height: '30px',
			position: 'absolute',
			display: 'inline-block',
			top: '50%',
			left: '50%',
			marginTop: '-15px',
			marginLeft: '-50px',
			textAlign: 'center',
			outline: 'none',
			background: 'rgba(255, 255, 255, 0.3)',
			fontSize: '1rem',
			lineHeight: '20px',
			color: 'white',
			textTransform: 'uppercase',
			border: 'none',
			textDecoration: 'none',
			lineHeight: '27px'
		}
	}
};

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
