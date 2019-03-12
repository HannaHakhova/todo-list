import React, {Component} from 'react';
import * as R from 'ramda';
import {Segment, Header} from 'semantic-ui-react';
import Footer from 'components/Footer';
import TodoInput from 'components/TodoInput';
import TodoList from 'components/TodoList';
import {getFormattedDate} from 'utils';
import {bool, arrayOf, string, number, shape, func} from 'prop-types';

class TodosPart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'all',
            directionUp: true,
            todos: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.prepareTodos(nextProps.todos, nextProps.tags, nextProps.todosTags);
    }

    prepareTodos = (todos, tags, todosTags) => {
        const newTodos = todos.map(todo => {
            const todosTagsForCurrentTodo = todosTags.filter(f => f.taskId === todo.id);
            const tagsForCurrentTodo = todosTagsForCurrentTodo.map(currentTodosTags => ({...tags.filter(tag => tag.id === currentTodosTags.tagId)[0], bindingId: currentTodosTags.id}));
            return {...todo, tags: tagsForCurrentTodo};
        });
        this.setState({todos: newTodos.map(x => ({...x, createdDate: getFormattedDate(x.createdDate)}))});
    };

    handleActiveItemChange = activeItem => this.setState({activeItem});

    sortByDateAndCompleted = () => {
        const sortDirection = this.state.directionUp === true ? R.ascend : R.descend;
        const todos = R.sortWith([
            sortDirection(R.prop('createdDate')),
            sortDirection(R.prop('completed'))
        ])(this.state.todos);
        this.setState({todos, directionUp: !this.state.directionUp});
    }

    render() {
        return (
            <div>
                <br />
                <Segment size='mini' textAlign='left' padded='very'>
                    <Header textAlign='center' as='h2'>Todo list </Header>
                    <TodoInput handleSubmit={this.props.createTodo} />
                    <TodoList handleComplete={this.props.toggleCompleted} handleDelete={this.props.deleteTodo} todos={this.state.todos} handleDeleteTodoTag={this.props.deleteTodoTag} activeItem={this.state.activeItem} sortByDateAndCompleted={this.sortByDateAndCompleted} addTodoTag={this.props.addTodoTag} />
                    <Footer
                        todos={this.state.todos}
                        handleClearCompleted={this.props.clearCompleted}
                        handleActiveItemChange={this.handleActiveItemChange} />
                </Segment>
            </div>
        );
    }
}

TodosPart.propTypes = {
    todos: arrayOf(shape({
        id: string.isRequired,
        title: string.isRequired,
        completed: bool.isRequired,
        createdDate: string.isRequired}).isRequired).isRequired,
    todosTags: arrayOf(shape({
        id: number.isRequired,
        taskId: string.isRequired,
        tagId: string.isRequired}).isRequired).isRequired,
    tags: arrayOf(shape({
        id: string.isRequired,
        title: string.isRequired}).isRequired).isRequired,
    createTodo: func.isRequired,
    deleteTodo: func.isRequired,
    toggleCompleted: func.isRequired,
    clearCompleted: func.isRequired,
    deleteTodoTag: func.isRequired,
    addTodoTag: func.isRequired
};

export default TodosPart;
