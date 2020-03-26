import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import styles from '../styles/NavbarStyles';
import { withStyles } from '@material-ui/core/styles';

class Navbar extends Component {
	state = {
		format: 'hex',
		open: false
	};

	handleChangeFormat = evt => {
		this.setState({ format: evt.target.value, open: true });
		this.props.changeFormat(evt);
	};

	closeSnackBar = () => {
		this.setState({ open: false });
	};

	render() {
		const { level, changeLevel, showSlider, classes } = this.props;
		const { format, open } = this.state;
		return (
			<nav className={classes.Navbar}>
				<div className={classes.logo}>
					<Link to='/'>REACT COLOR PICKER</Link>
				</div>
				{showSlider && (
					<div>
						<span>Level: {level}</span>
						<div className={classes.slider}>
							<Slider
								defaultValue={level}
								min={100}
								max={900}
								step={100}
								onAfterChange={changeLevel}
							/>
						</div>
					</div>
				)}

				<div className={classes.selectContainer}>
					<Select value={format} onChange={this.handleChangeFormat}>
						<MenuItem value='hex'>HEX - #ffff</MenuItem>
						<MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
						<MenuItem value='rgba'>RGBA - rgba(255,255,255,1)</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={open}
					onClose={this.closeSnackBar}
					autoHideDuration={3000}
					message={
						<span id='message-id'>
							Format Changed to {format.toUpperCase()}
						</span>
					}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					action={[
						<IconButton
							onClick={this.closeSnackBar}
							color='inherit'
							key='close'
							aria-label='close'
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</nav>
		);
	}
}

export default withStyles(styles)(Navbar);
