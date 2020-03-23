import React, { Component } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteFormNav extends Component {
	state = {
		newPaletteName: ''
	};

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
			return this.props.palettes.every(
				palette => palette.paletteName.toLowerCase() !== value.toLowerCase()
			);
		});
	}

	handleNameChange = evt => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	render() {
		const {
			open,
			classes,
			handleDrawerOpen,
			handleNewPaletteSubmit
		} = this.props;
		const { newPaletteName } = this.state;
		return (
			<div>
				<CssBaseline />
				<AppBar
					position='fixed'
					color='default'
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' noWrap>
							Persistent drawer
						</Typography>
						<ValidatorForm
							onSubmit={() => handleNewPaletteSubmit(newPaletteName)}
						>
							<TextValidator
								label='Palette Name'
								name='newPaletteName'
								value={newPaletteName}
								onChange={this.handleNameChange}
								validators={['required', 'isPaletteNameUnique']}
								errorMessages={['Enter a Palette Name', 'Name already taken']}
							/>
							<Button variant='contained' color='primary' type='submit'>
								Save Palette
							</Button>
							<Link to='/'>
								<Button variant='contained' color='secondary'>
									Go Back
								</Button>
							</Link>
						</ValidatorForm>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default PaletteFormNav;
