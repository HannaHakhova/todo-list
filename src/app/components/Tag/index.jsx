import React, {Component} from 'react';
import {Label, Icon} from 'semantic-ui-react';
import {string, func, shape, number} from 'prop-types';

class Tag extends Component {
    onDragStart = (e, v) => {
        const ev = e;
        ev.dataTransfer.dropEffect = 'move';
        ev.dataTransfer.setData('text/plain', v);
    }

    render() {
        return (
            <div>
                <Label as='a' tag color='teal' draggable='true' onDragStart={e => this.onDragStart(e, this.props.tag.id)}> {this.props.tag.title}
                    <Label.Detail>{this.props.tag.count}</Label.Detail>
                    <Icon name='delete' onClick={() => this.props.handleDelete(this.props.tag.id)} />
                </Label>
            </div>
        );
    }
}

Tag.propTypes = {
    tag: shape({
        id: string.isRequired,
        title: string.isRequired,
        count: number.isRequired
    }).isRequired,
    handleDelete: func.isRequired
};

export default Tag;