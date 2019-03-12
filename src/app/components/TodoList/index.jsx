import React from 'react';
import {List, Message, Icon} from 'semantic-ui-react';
import {func, bool, instanceOf, arrayOf, string, shape, number} from 'prop-types';
import Todo from 'components/Todo';


const TodoList = ({todos, handleDelete, handleComplete, activeItem, sortByDateAndCompleted, handleDeleteTodoTag, addTodoTag}) => {
    let todosToLists = [];
    switch (activeItem) {
        case 'all': todosToLists = todos; break;
        case 'completed': todosToLists = todos.filter(todo => todo.completed === true); break;
        default: todosToLists = todos.filter(todo => todo.completed === false); break;
    }

    return (
        <div>
            { todosToLists.length !== 0 ?
                <div>
                    <List relaxed>
                        {todosToLists.map(todo => (<List.Item key={todo.id}>
                            <Todo
                                sortByDateAndCompleted={sortByDateAndCompleted}
                                handleComplete={handleComplete}
                                handleDeleteTodoTag={handleDeleteTodoTag}
                                handleDelete={handleDelete}
                                todo={todo}
                                addTodoTag={addTodoTag} />
                        </List.Item>)

                        )}
                    </List>
                </div> : <div>
                    <br />
                    <Message warning attached='bottom' size='big'>
                        <Icon name='warning' />
                            No todos
                    </Message>
                </div>}
        </div>);
};

TodoList.propTypes = {
    todos: arrayOf(shape({
        title: string.isRequired,
        completed: bool.isRequired,
        createdDate: instanceOf(Date).isRequired,
        tags: arrayOf(shape({
            id: string.isRequired,
            title: string.isRequired,
            bindingId: number.isRequired}).isRequired).isRequired
    }).isRequired).isRequired,
    handleDelete: func.isRequired,
    handleComplete: func.isRequired,
    activeItem: string.isRequired,
    sortByDateAndCompleted: func.isRequired,
    handleDeleteTodoTag: func.isRequired,
    addTodoTag: func.isRequired
};
export default TodoList;