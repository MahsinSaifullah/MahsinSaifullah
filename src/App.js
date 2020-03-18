import React from 'react';
import Palette from './Palette';
import seedColors from './seedColor';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';

function findPalette(id) {
	return seedColors.find(palette => palette.id === id);
}

function App() {
	return (
		<Switch>
			<Route
				exact
				path='/'
				render={routeProps => (
					<PaletteList palettes={seedColors} {...routeProps} />
				)}
			/>
			<Route
				exact
				path='/palette/:id'
				render={routeProps => (
					<Palette
						palette={generatePalette(findPalette(routeProps.match.params.id))}
					/>
				)}
			/>
			<Route
				exact
				path='/palette/:paletteId/:colorId'
				render={() => <SingleColorPalette />}
			/>
		</Switch>
	);
}

export default App;
