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
		open: true,
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
			<Dialog
				open={open}
				onClose={this.handleClickClose}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
				<ValidatorForm onSubmit={() => handleNewPaletteSubmit(newPaletteName)}>
					<DialogContent>
						<DialogContentText>
							Please enter a name for your palette. Make sure it is unique.
						</DialogContentText>

						<TextValidator
							label='Palette Name'
							name='newPaletteName'
							value={newPaletteName}
							fullWidth
							margin='normal'
							onChange={this.handleNameChange}
							validators={['required', 'isPaletteNameUnique']}
							errorMessages={['Enter a Palette Name', 'Name already taken']}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClickClose} color='primary'>
							Cancel
						</Button>
						<Button variant='contained' color='primary' type='submit'>
							Save Palette
						</Button>
					</DialogActions>
				</ValidatorForm>
			</Dialog>
		);
	}
}

export default PaletteMetaForm;
