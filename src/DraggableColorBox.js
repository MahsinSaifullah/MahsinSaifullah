import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement(
	({ color, classes, handleRemove }) => {
		return (
			<div className={classes.root} style={{ backgroundColor: color.color }}>
				<div className={classes.boxContent}>
					<span>{color.name}</span>
					<DeleteIcon className={classes.deleteIcon} onClick={handleRemove} />
				</div>
			</div>
		);
	}
);

export default withStyles(styles)(DraggableColorBox);
