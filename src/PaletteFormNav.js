import React, { Component } from 'react';
import PaletteMetaForm from './PaletteMetaForm';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
	state = {
		showForm: false
	};

	handleNameChange = evt => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	handleShowForm = () => {
		this.setState({ showForm: true });
	};

	handleHideForm = () => {
		this.setState({ showForm: false });
	};

	render() {
		const {
			open,
			classes,
			palettes,
			handleDrawerOpen,
			handleNewPaletteSubmit
		} = this.props;

		const { showForm } = this.state;

		return (
			<div className={classes.root}>
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
							<AddToPhotosIcon />
						</IconButton>
						<Typography variant='h6' noWrap>
							Create a Palette
						</Typography>
					</Toolbar>
					<div className={classes.navButtons}>
						<Link to='/'>
							<Button
								className={classes.button}
								variant='contained'
								color='secondary'
							>
								Go Back
							</Button>
						</Link>
						<Button
							className={classes.button}
							variant='contained'
							color='primary'
							onClick={this.handleShowForm}
						>
							Save
						</Button>
					</div>
				</AppBar>
				{showForm && (
					<PaletteMetaForm
						handleNewPaletteSubmit={handleNewPaletteSubmit}
						palettes={palettes}
						handleHideForm={this.handleHideForm}
					/>
				)}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
