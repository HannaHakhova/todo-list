import React from 'react';
import {List} from 'semantic-ui-react';
import {arrayOf, string, shape, func, number} from 'prop-types';
import TodoTag from 'components/TodoTag';


const TodoTagList = ({todoTags, handleDeleteTodoTag}) => {
    const todoTagArray = todoTags.map(todoTag => <TodoTag todoTag={todoTag} key={todoTag.id} handleDeleteTodoTag={handleDeleteTodoTag} />);
    return (
        <List horizontal>
            {todoTagArray}
        </List>
    );
};

TodoTagList.propTypes = {
    todoTags: arrayOf(shape({
        id: string.isRequired,
        title: string.isRequired,
        bindingId: number.isRequired
    }).isRequired).isRequired,
    handleDeleteTodoTag: func.isRequired
};

export default TodoTagList;