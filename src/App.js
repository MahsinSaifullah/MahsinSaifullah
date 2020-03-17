import React from 'react';
import Palette from './Palette';
import seedColors from './seedColor';
import { Route, Switch } from 'react-router-dom';
import { generatePalette } from './colorHelpers';

function findPalette(id) {
	return seedColors.find(palette => palette.id === id);
}

function App() {
	return (
		<Switch>
			<Route exact path='/' render={() => <h1>Palette List Component</h1>} />
			<Route
				exact
				path='/palette/:id'
				render={routeProps => (
					<Palette
						palette={generatePalette(findPalette(routeProps.match.params.id))}
					/>
				)}
			/>
		</Switch>

		// <div className='App'>
		// 	<Palette palette={generatePalette(seedColors[4])} />
		// </div>
	);
}

export default App;
