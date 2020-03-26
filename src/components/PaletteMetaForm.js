import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class PaletteMetaForm extends Component {
	state = {
		stage: 'paletteForm',
		newPaletteName: ''
	};

	handleNameChange = evt => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	pickEmoji = () => {
		this.setState({ stage: 'emojiForm' });
	};

	savePalette = emoji => {
		const newPalette = {
			paletteName: this.state.newPaletteName,
			emoji: emoji.native
		};
		this.props.handleNewPaletteSubmit(newPalette);
		this.setState({ stage: '' });
	};

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
			return this.props.palettes.every(
				palette => palette.paletteName.toLowerCase() !== value.toLowerCase()
			);
		});
	}

	render() {
		const { stage, newPaletteName } = this.state;
		const { handleHideForm } = this.props;
		return (
			<div>
				<Dialog open={stage === 'emojiForm'} onClose={handleHideForm}>
					<DialogTitle id='form-dialog-title'>
						Choose an Emoji for your Palette
					</DialogTitle>
					<Picker title='Pick an Emoji' onSelect={this.savePalette} />
				</Dialog>
				<Dialog
					open={stage === 'paletteForm'}
					onClose={handleHideForm}
					aria-labelledby='form-dialog-title'
				>
					<DialogTitle id='form-dialog-title'>
						Choose a Palette Name
					</DialogTitle>
					<ValidatorForm onSubmit={this.pickEmoji}>
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
							<Button onClick={handleHideForm} color='primary'>
								Cancel
							</Button>
							<Button variant='contained' color='primary' type='submit'>
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}

export default PaletteMetaForm;
