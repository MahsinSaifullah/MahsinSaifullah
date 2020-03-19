import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/core/styles';
import './ColorBox.css';

const styles = {
	colorBox: {
		width: '20%',
		height: props => (props.showMoreLink ? '25%' : '50%'),
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-3.5px',
		'&:hover button': {
			opacity: 1,
			transition: '0.5s'
		}
	},
	copyText: {
		color: props =>
			chroma(props.background).luminance() >= 0.5
				? 'rgb(0, 0, 0, 0.5) '
				: 'white'
	},
	colorName: {
		color: props =>
			chroma(props.background).luminance() <= 0.05 ? 'white' : 'black'
	},
	copyButtonText: {
		color: props =>
			chroma(props.background).luminance() >= 0.5 ? 'black' : 'white'
	},
	copyButton: {
		color: props =>
			chroma(props.background).luminance() >= 0.5 ? 'black' : 'white',
		width: '100px',
		height: '30px',
		position: 'absolute',
		display: 'inline-block',
		top: '50%',
		left: '50%',
		marginTop: '-15px',
		marginLeft: '-50px',
		textAlign: 'center',
		outline: 'none',
		background: 'rgba(255, 255, 255, 0.3)',
		fontSize: '1rem',
		lineHeight: '20px',
		textTransform: 'uppercase',
		border: 'none',
		textDecoration: 'none',
		opacity: 0
	},
	seeMore: {
		color: props =>
			chroma(props.background).luminance() >= 0.5
				? 'rgb(0, 0, 0, 0.5) '
				: 'white',
		background: 'rgba(255, 255, 255, 0.3)',
		position: 'absolute',
		border: 'none',
		right: '0',
		bottom: '0',
		width: '60px',
		height: '30px',
		textAlign: 'center',
		lineHeight: '30px',
		textTransform: 'uppercase'
	}
};

class ColorBox extends Component {
	state = {
		copied: false
	};

	changeCopyState = () => {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 1500);
		});
	};
	render() {
		const {
			name,
			background,
			colorId,
			paletteId,
			showMoreLink,
			classes
		} = this.props;
		const { copied } = this.state;

		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div style={{ background }} className={classes.colorBox}>
					<div
						style={{ background }}
						className={`copy-overlay ${copied && 'show'}`}
					/>
					<div className={`copy-msg ${copied && 'show'}`}>
						<h1 className={classes.copyButtonText}>copied!</h1>
						<p className={classes.copyText}>{background}</p>
					</div>
					<div className='copy-container'>
						<div className='box-content'>
							<span className={classes.colorName}>{name}</span>
						</div>
						<button className={classes.copyButton}>Copy</button>
					</div>
					{showMoreLink && (
						<Link
							to={`/palette/${paletteId}/${colorId}`}
							onClick={e => e.stopPropagation()}
						>
							<span className={classes.seeMore}>More</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default withStyles(styles)(ColorBox);
