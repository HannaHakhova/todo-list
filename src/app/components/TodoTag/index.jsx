import React from 'react';
import {Label, Icon} from 'semantic-ui-react';
import {string, shape, func, number} from 'prop-types';

const TodoTag = ({todoTag, handleDeleteTodoTag}) =>
    (
        <Label as='a' size='tiny' tag color='blue'> {todoTag.title}
            <Icon name='delete' onClick={() => handleDeleteTodoTag(todoTag.bindingId)} />
        </Label>
    );


TodoTag.propTypes = {
    todoTag: shape({
        id: string.isRequired,
        title: string.isRequired,
        bindingId: number.isRequired}).isRequired,
    handleDeleteTodoTag: func.isRequired
};

export default TodoTag;