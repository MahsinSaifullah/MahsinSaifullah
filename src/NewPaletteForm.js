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

const drawerWidth = 400;

const styles = theme => ({
	root: {
		display: 'flex'
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	}
});

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

	handleNewPaletteSubmit = newPaletteName => {
		const newPalette = {
			paletteName: newPaletteName,
			id: newPaletteName.toLowerCase().replace(/ /g, '-'),
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
					classes={classes}
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
					<Typography variant='h4'>Design Your Palette</Typography>
					<div>
						<Button
							variant='contained'
							color='secondary'
							onClick={this.clearColors}
						>
							Clear Palette
						</Button>
						<Button
							variant='contained'
							color='primary'
							onClick={this.addRandomColor}
							disabled={paletteIsFull}
						>
							Random Color
						</Button>
					</div>
					<ColorPickerForm
						paletteIsFull={paletteIsFull}
						addNewColor={this.addNewColor}
						colors={colors}
					/>
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
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
