import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/ColorBoxStyles';

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
						className={`${classes.copyOverlay} ${copied &&
							classes.showOverlay}`}
					/>
					<div
						className={`${classes.copyMessage} ${copied &&
							classes.showMessageOverlay}`}
					>
						<h1>copied!</h1>
						<p>{background}</p>
					</div>
					<div>
						<div className={classes.boxContent}>
							<span>{name}</span>
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
