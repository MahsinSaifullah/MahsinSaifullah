import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({ colors, removeBox }) => {
	return (
		<div style={{ height: '100%' }}>
			{colors.map((color, i) => {
				return (
					<DraggableColorBox
						index={i}
						key={color.name}
						color={color}
						handleRemove={() => removeBox(color.name)}
					/>
				);
			})}
		</div>
	);
});

export default DraggableColorList;
