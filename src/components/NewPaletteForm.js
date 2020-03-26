import React, { Component } from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import styles from '../styles/NewPaletteFormStyles';

class NewPaletteForm extends Component {
	static defaultProps = {
		maxNumColors: 20
	};

	state = {
		open: false,
		colors: this.props.palettes[0].colors
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	addNewColor = newColor => {
		this.setState({
			colors: [...this.state.colors, newColor],
			newColorName: ''
		});
	};

	handleNameChange = evt => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	handleNewPaletteSubmit = palette => {
		const newPalette = {
			paletteName: palette.paletteName,
			id: palette.paletteName.toLowerCase().replace(/ /g, '-'),
			emoji: palette.emoji,
			colors: this.state.colors
		};
		this.props.savePalette(newPalette);
		this.props.history.push('/');
	};

	removeBox = colorName => {
		this.setState({
			colors: this.state.colors.filter(color => color.name !== colorName)
		});
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex)
		}));
	};

	clearColors = () => {
		this.setState({ colors: [] });
	};

	addRandomColor = () => {
		const allColors = this.props.palettes.map(palette => palette.colors).flat();
		const randIndex = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[randIndex];
		this.setState({ colors: [...this.state.colors, randomColor] });
	};

	render() {
		const { open, colors } = this.state;
		const { classes, maxNumColors, palettes } = this.props;
		const paletteIsFull = colors.length >= maxNumColors;

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					handleDrawerOpen={this.handleDrawerOpen}
					palettes={palettes}
					handleNewPaletteSubmit={newName =>
						this.handleNewPaletteSubmit(newName)
					}
				/>
				<Drawer
					className={classes.drawer}
					variant='persistent'
					anchor='left'
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<div className={classes.drawerContainer}>
						<Typography variant='h4' gutterBottom>
							Design Your Palette
						</Typography>
						<div className={classes.buttons}>
							<Button
								variant='contained'
								color='secondary'
								onClick={this.clearColors}
								className={classes.button}
							>
								Clear Palette
							</Button>
							<Button
								variant='contained'
								color='primary'
								onClick={this.addRandomColor}
								disabled={paletteIsFull}
								className={classes.button}
							>
								Random Color
							</Button>
						</div>
						<ColorPickerForm
							paletteIsFull={paletteIsFull}
							addNewColor={this.addNewColor}
							colors={colors}
						/>
					</div>
				</Drawer>
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />

					<DraggableColorList
						axis='xy'
						colors={colors}
						onSortEnd={this.onSortEnd}
						removeBox={this.removeBox}
						distance={20}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
