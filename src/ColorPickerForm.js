import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

class ColorPickerForm extends Component {
	state = {
		currentColor: 'teal',
		newColorName: ''
	};

	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', value => {
			return this.props.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			);
		});

		ValidatorForm.addValidationRule('isColorUnique', value => {
			return this.props.colors.every(
				({ color }) => color !== this.state.currentColor
			);
		});
	}

	handleNameChange = evt => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	updateCurrentColor = newColor => {
		this.setState({ currentColor: newColor.hex });
	};

	render() {
		const { paletteIsFull, addNewColor } = this.props;
		const { currentColor, newColorName } = this.state;
		const newColor = {
			name: newColorName,
			color: currentColor
		};

		return (
			<div>
				<ChromePicker
					color={currentColor}
					onChangeComplete={newColor => this.updateCurrentColor(newColor)}
				/>
				<ValidatorForm onSubmit={() => addNewColor(newColor)}>
					<TextValidator
						value={newColorName}
						name='newColorName'
						onChange={this.handleNameChange}
						validators={['required', 'isColorNameUnique', 'isColorUnique']}
						errorMessages={[
							'Enter a Color name',
							'Color name has to be Unique',
							'Color already used'
						]}
					/>
					<Button
						variant='contained'
						type='submit'
						color='primary'
						style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
						disabled={paletteIsFull}
					>
						{paletteIsFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default ColorPickerForm;
