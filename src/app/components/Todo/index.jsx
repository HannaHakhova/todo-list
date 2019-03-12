import React, {Component} from 'react';
import {Checkbox, List, Button, Label, Icon} from 'semantic-ui-react';
import {shape, func, string, instanceOf, number, bool, arrayOf} from 'prop-types';
import {getLabelDate} from 'utils';
import TodoTagList from 'components/TodoTagList';

class Todo extends Component {
    onDrop = e => {
        const data = e.dataTransfer.getData('text/plain');
        this.props.addTodoTag(data, this.props.todo.id);
    }
    allowDrop = ev => {
        ev.preventDefault();
    }

    render() {
        const tagArray = this.props.todo.tags;
        return (
            <div onDragOver={this.allowDrop} onDrop={this.onDrop}>
                <div>
                    <List.Item floated='left'>
                        <Checkbox
                            checked={this.props.todo.completed}
                            onChange={() => this.props.handleComplete(this.props.todo.id)}
                            label={this.props.todo.title} />
                        <Label as='a' size='tiny' onClick={() => this.props.sortByDateAndCompleted()}>
                            <Icon name='calendar' />
                            {getLabelDate(this.props.todo.createdDate)}
                        </Label>

                        <Button size='small' floated='right' icon='delete' onClick={() => this.props.handleDelete(this.props.todo.id)} />
                    </List.Item>
                </div>
                <div>
                    <TodoTagList todoTags={tagArray} handleDeleteTodoTag={this.props.handleDeleteTodoTag} />
                </div>
            </div>
        );
    }
}

Todo.propTypes = {
    handleDelete: func.isRequired,
    handleDeleteTodoTag: func.isRequired,
    handleComplete: func.isRequired,
    sortByDateAndCompleted: func.isRequired,
    addTodoTag: func.isRequired,
    todo: shape({
        id: string.isRequired,
        title: string.isRequired,
        completed: bool.isRequired,
        createdDate: instanceOf(Date).isRequired,
        tags: arrayOf(shape({
            id: string.isRequired,
            title: string.isRequired,
            bindingId: number.isRequired}).isRequired).isRequired
    }).isRequired
};

export default Todo;