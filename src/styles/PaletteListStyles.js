import sizes from '../helpers/sizes';
import bg from './bg.svg';
export default {
	'@global': {
		'.fade-exit': {
			opacity: 1
		},
		'.fade-exit': {
			opacity: 0,
			transition: 'opacity 500ms ease-out'
		}
	},
	root: {
		/* background by SVGBackgrounds.com */
		backgroundColor: '#394bad',
		backgroundImage: `url(${bg})`,
		height: '100vh',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		overflow: 'scroll'
	},
	heading: {
		fontSize: '2rem',
		textShadow: ' 1px 2px black',
		[sizes.down('xs')]: {
			fontSize: '1.5rem'
		},
		[sizes.down('xxs')]: {
			fontSize: '1.3rem'
		}
	},
	container: {
		width: '50%',
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		flexWrap: 'wrap',
		[sizes.down('xl')]: {
			width: '65%'
		},
		[sizes.down('lg')]: {
			width: '70%'
		},
		[sizes.down('md')]: {
			width: '60%'
		},
		[sizes.down('sm')]: {
			width: '70%'
		},
		[sizes.down('xs')]: {
			width: '50%'
		},
		[sizes.down('xs')]: {
			width: '60%'
		}
	},
	nav: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		color: 'white',
		alignItems: 'center',
		'& a': {
			color: 'white'
		}
	},
	palettes: {
		boxSizing: 'border-box',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 30%)',
		gridGap: '5%',
		[sizes.down('md')]: {
			gridTemplateColumns: 'repeat(2, 50%)',
			gridGap: '4%'
		},
		[sizes.down('xs')]: {
			gridTemplateColumns: 'repeat(1, 100%)',
			gridGap: '2%'
		}
	}
};
