import React, { Component } from 'react';
import PaletteMetaForm from './PaletteMetaForm';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 400;

const styles = theme => ({
	root: {
		display: 'flex'
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
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
	navButtons: {
		marginRight: '1rem',
		'& a': {
			textDecoration: 'none'
		}
	},
	button: {
		margin: '0 0.5rem'
	}
});

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
							<MenuIcon />
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
					/>
				)}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
