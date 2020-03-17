import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
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
				<Navbar level={level} changeLevel={this.changeLevel} />

				<div className='Palette-colors'>{colorBoxes}</div>
				{/* Footer */}
			</div>
		);
	}
}

export default Palette;
