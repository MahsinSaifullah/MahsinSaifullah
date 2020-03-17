import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css';

class Palette extends Component {
	state = {
		level: 500
	};

	changeLevel = level => {
		this.setState({ level });
	};
	render() {
		const { color } = this.props.palette;
		const { level } = this.state;
		const colorBoxes = color[level].map(color => (
			<ColorBox background={color.hex} name={color.name} />
		));
		return (
			<div className='Palette'>
				{/* Navbar */}
				<div className='slider'>
					<Slider
						defaultValue={level}
						min={100}
						max={900}
						step={100}
						onAfterChange={this.changeLevel}
					/>
				</div>

				<div className='Palette-colors'>{colorBoxes}</div>
				{/* Footer */}
			</div>
		);
	}
}

export default Palette;
