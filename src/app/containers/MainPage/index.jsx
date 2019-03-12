import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import TodosPart from 'containers/TodosPart';
import TagsPart from 'containers/TagsPart';
import {getAllData, createData, updateData, deleteData, todosTagsApiUrl, todoApiUrl, tagApiUrl} from 'api';
import {getDateNow, getApiDate} from 'utils';
import rand from 'random-key';

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            todosTags: [],
            todos: [],
            tags: []
        };
    }

    componentDidMount = () => {
        this.getAllData();
    }

    getAllData = () => {
        Promise.all([getAllData(todosTagsApiUrl), getAllData(todoApiUrl), getAllData(tagApiUrl)])
            .then(response => this.setState({todosTags: response[0].data, todos: response[1].data, tags: response[2].data}));
    };

    createTodo = title => {
        if (title.trim()) {
            const newTodo = {id: rand.generate(), title, completed: false, createdDate: getApiDate(getDateNow())};
            const newTodos = [newTodo, ...this.state.todos];
            this.setState({todos: newTodos});
            createData(todoApiUrl, newTodo);
        }
    }

    createTag = title => {
        if (title.trim()) {
            const newTag = {id: rand.generate(), title};
            const newTags = [newTag, ...this.state.tags];
            this.setState({tags: newTags});
            createData(tagApiUrl, newTag);
        }
    }

    deleteTodo = idToBeDeleted => {
        this.setState({todos: this.state.todos.filter(todo => todo.id !== idToBeDeleted)});
        this.setState({todosTags: this.state.todosTags.filter(todoTag => todoTag.taskId !== idToBeDeleted)});
        deleteData(todoApiUrl, idToBeDeleted);
        deleteData(todosTagsApiUrl, idToBeDeleted);
    }

    deleteTag = idToBeDeleted => {
        this.setState({tags: this.state.tags.filter(tag => tag.id !== idToBeDeleted)});
        this.setState({todosTags: this.state.todosTags.filter(todoTag => todoTag.tagId !== idToBeDeleted)});
        deleteData(tagApiUrl, idToBeDeleted);
    };

    deleteTodoTag = idToBeDeleted => {
        this.setState({todosTags: this.state.todosTags.filter(todoTag => todoTag.id !== idToBeDeleted)});
        deleteData(todosTagsApiUrl, idToBeDeleted);
    };

    addTodoTag = (tagId, todoId) => {
        const arrTagId = this.state.todosTags.filter(x => x.tagId === tagId);
        const arrTodoId = arrTagId.filter(x => x.taskId === todoId);
        if (arrTodoId.length === 0) {
            const todoTagIds = this.state.todosTags.map(x => x.id);
            const newTodoTag = {id: Math.max(...todoTagIds) + 1, taskId: todoId, tagId};
            const newTodoTags = [...this.state.todosTags, newTodoTag];
            this.setState({todosTags: newTodoTags});
            createData(todosTagsApiUrl, newTodoTag);
        }
    }

    toggleCompleted = idToBeMarkedAsCompleted => {
        const todoToComplete = this.state.todos.filter(todo => todo.id === idToBeMarkedAsCompleted);
        updateData(todoApiUrl, idToBeMarkedAsCompleted, {completed: !todoToComplete[0].completed})
            .then(response => {
                this.setState({todos: this.state.todos.reduce((previous, current) => {
                    if (current.id === idToBeMarkedAsCompleted) {
                        return [...previous, {...response.data, createdDate: response.data.createdDate}];
                    }
                    return [...previous, current];
                }, [])});
            });
    }

    clearCompleted = () => {
        const {todos, todosTags} = this.state;
        const todoIdsToDeleteArray = todos.filter(todo => todo.completed).map(y => y.id);
        const todoTagIdsToDeleteArray = todosTags.filter(x => todoIdsToDeleteArray.includes(x.taskId)).map(y => y.id);
        const todosPromisesArray = todoIdsToDeleteArray.map(x => deleteData(todoApiUrl, x));


        Promise.all(todosPromisesArray)
            .then(() => {
                this.setState({
                    todos: todos.filter(x => !todoIdsToDeleteArray.includes(x.id)),
                    todosTags: todosTags.filter(x => !todoTagIdsToDeleteArray.includes(x.id))
                });
            })
            .catch(() => {
                this.getAllData();
            });
    }

    render() {
        return (
            <Grid columns='equal'>
                <Grid.Column width={4} />
                <Grid.Column width={6}>
                    <TodosPart
                        todos={this.state.todos}
                        todosTags={this.state.todosTags}
                        tags={this.state.tags}
                        createTodo={this.createTodo}
                        deleteTodo={this.deleteTodo}
                        toggleCompleted={this.toggleCompleted}
                        clearCompleted={this.clearCompleted}
                        deleteTodoTag={this.deleteTodoTag}
                        addTodoTag={this.addTodoTag} />
                </Grid.Column>
                <Grid.Column width={3} >
                    <TagsPart
                        tags={this.state.tags}
                        todosTags={this.state.todosTags}
                        createTag={this.createTag}
                        deleteTag={this.deleteTag} />
                </Grid.Column>
            </Grid>);
    }
}

export default MainPage;
