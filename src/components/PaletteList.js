import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue, red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from '../styles/PaletteListStyles';

class PaletteList extends Component {
	state = {
		openDeleteDialogue: false,
		deleteId: ''
	};

	openDialogue = id => {
		this.setState({ openDeleteDialogue: true, deleteId: id });
	};
	closeDialogue = () => {
		this.setState({ openDeleteDialogue: false, deleteId: '' });
	};
	gotoRoute = id => {
		this.props.history.push(`/palette/${id}`);
	};
	handleDelete = () => {
		this.closeDialogue();
		this.props.deletePalette(this.state.deleteId);
	};
	render() {
		const { openDeleteDialogue } = this.state;
		const { palettes, classes } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.heading}>React Colors</h1>
						<Link to='/palette/new'>Create Palette</Link>
					</nav>

					<TransitionGroup className={classes.palettes}>
						{palettes.map(palette => (
							<CSSTransition key={palette.id} classNames='fade' timeout={500}>
								<MiniPalette
									{...palette}
									key={palette.id}
									deletePalette={this.openDialogue}
									handleClick={this.gotoRoute}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<Dialog
					open={openDeleteDialogue}
					aria-labelledby='delete-dialogue-title'
					onClose={this.closeDialogue}
				>
					<DialogTitle id='delete-dialogue-title'>
						Delete this palette?
					</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar
									style={{ backgroundColor: blue[100], color: blue[600] }}
								>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Delete</ListItemText>
						</ListItem>
						<ListItem button onClick={this.closeDialogue}>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Cancel</ListItemText>
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
