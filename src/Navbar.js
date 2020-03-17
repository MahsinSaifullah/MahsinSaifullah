import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
	state = {
		format: 'hex'
	};

	handleChangeFormat = evt => {
		this.setState({ format: evt.target.value });
		this.props.changeFormat(evt);
	};

	render() {
		const { level, changeLevel } = this.props;
		return (
			<nav className='Navbar'>
				<div className='logo'>
					<a href='#'>REACT COLOR PICKER</a>
				</div>
				<div className='slider-container'>
					<span>Level: {level}</span>
					<div className='slider'>
						<Slider
							defaultValue={level}
							min={100}
							max={900}
							step={100}
							onAfterChange={changeLevel}
						/>
					</div>
				</div>
				<div className='select-container'>
					<Select value={this.state.format} onChange={this.handleChangeFormat}>
						<MenuItem value='hex'>HEX - #ffff</MenuItem>
						<MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value='rgba'>RGBA - rgba(255,255,255,1)</MenuItem>
					</Select>
				</div>
			</nav>
		);
	}
}

export default Navbar;
