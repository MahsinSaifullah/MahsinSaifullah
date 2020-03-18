import React, { Component } from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
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

	render() {
		const colorBoxes = this._shade.map(color => (
			<ColorBox
				background={color.hex}
				name={color.name}
				key={color.id}
				showMoreLink={false}
			/>
		));
		return (
			<div className='Palette'>
				<h1>Single Color Palette</h1>
				<div className='Palette-colors'>{colorBoxes}</div>
			</div>
		);
	}
}

export default SingleColorPalette;
