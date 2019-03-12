import React from 'react';
import {List} from 'semantic-ui-react';
import {func, arrayOf, number, string, shape} from 'prop-types';
import Tag from 'components/Tag';


const TagList = ({tags, handleDelete}) => {
    const tagArray = tags.map(tag =>
        <Tag tag={tag} key={tag.id} handleDelete={handleDelete} />);
    return (
        <List>
            {tagArray}
        </List>
    );
};

TagList.propTypes = {
    handleDelete: func.isRequired,
    tags: arrayOf(shape({
        id: string.isRequired,
        title: string.isRequired,
        count: number.isRequired
    }).isRequired).isRequired
};

export default TagList;