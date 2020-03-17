import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

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
		const { color } = this.props.palette;
		const { level, colorFormat } = this.state;
		const colorBoxes = color[level].map(color => (
			<ColorBox background={color[colorFormat]} name={color.name} />
		));
		return (
			<div className='Palette'>
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					changeFormat={this.changeFormat}
				/>

				<div className='Palette-colors'>{colorBoxes}</div>
				{/* Footer */}
			</div>
		);
	}
}

export default Palette;
