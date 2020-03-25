import { DRAWER_WIDTH } from '../constants';
const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
	root: {
		display: 'flex'
	},
	hide: {
		display: 'none'
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

export default styles;
