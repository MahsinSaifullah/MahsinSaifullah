import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import './ColorBox.css';

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
		const { name, background, colorId, paletteId, showMoreLink } = this.props;
		const { copied } = this.state;
		const isDarkColor = chroma(background).luminance() <= 0.05;
		const isLightColor = chroma(background).luminance() >= 0.5;
		const isMediumLightColor = chroma(background).luminance() >= 0.8;

		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div style={{ background }} className='ColorBox'>
					<div
						style={{ background }}
						className={`copy-overlay ${copied && 'show'}`}
					/>
					<div className={`copy-msg ${copied && 'show'}`}>
						<h1 className={isMediumLightColor && 'dark-text'}>copied!</h1>
						<p className={isLightColor && 'dark-text'}>{background}</p>
					</div>
					<div className='copy-container'>
						<div className='box-content'>
							<span className={isDarkColor && 'light-text'}>{name}</span>
						</div>
						<button
							className={
								isMediumLightColor ? 'copy-button dark-text' : 'copy-button'
							}
						>
							Copy
						</button>
					</div>
					{showMoreLink && (
						<Link
							to={`/palette/${paletteId}/${colorId}`}
							onClick={e => e.stopPropagation()}
						>
							<span
								className={isLightColor ? 'see-more dark-text' : 'see-more'}
							>
								More
							</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default ColorBox;
