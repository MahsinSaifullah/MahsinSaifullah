import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component {
	state = {
		open: false,
		newPaletteName: ''
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClickClose = () => {
		this.setState({ open: false });
	};

	handleNameChange = evt => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
			return this.props.palettes.every(
				palette => palette.paletteName.toLowerCase() !== value.toLowerCase()
			);
		});
	}

	render() {
		const { open, newPaletteName } = this.state;
		const { handleNewPaletteSubmit } = this.props;
		return (
			<div>
				<Button
					variant='outlined'
					color='primary'
					onClick={this.handleClickOpen}
				>
					Open form dialog
				</Button>
				<Dialog
					open={open}
					onClose={this.handleClickClose}
					aria-labelledby='form-dialog-title'
				>
					<DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To subscribe to this website, please enter your email address
							here. We will send updates occasionally.
						</DialogContentText>
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
						</ValidatorForm>
						<TextField
							autoFocus
							margin='dense'
							id='name'
							label='Email Address'
							type='email'
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClickClose} color='primary'>
							Cancel
						</Button>
						<Button onClick={this.handleClickClose} color='primary'>
							Subscribe
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default PaletteMetaForm;
