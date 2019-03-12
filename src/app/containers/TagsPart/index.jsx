import React, {Component} from 'react';
import {Segment, Header} from 'semantic-ui-react';
import TagList from 'components/TagList';
import TagInput from 'components/TagInput';
import {arrayOf, shape, number, string, func} from 'prop-types';

class TagsPart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };
    }

    componentWillReceiveProps = nextProps => {
        this.prepareTags(nextProps.tags, nextProps.todosTags);
    }

    prepareTags = (tags, todosTags) => {
        const newTags = tags.map(x => ({...x, count: todosTags.filter(y => y.tagId === x.id).length}));
        this.setState({tags: newTags});
    }

    render() {
        return (
            <div>
                <br />
                <Segment size='mini' textAlign='left' padded='very' >
                    <Header textAlign='center' as='h2'>Tags </Header>
                    <TagInput handleSubmit={this.props.createTag} />
                    <TagList tags={this.state.tags} handleDelete={this.props.deleteTag} />
                </Segment>
            </div>
        );
    }
}
TagsPart.propTypes = {
    tags: arrayOf(shape({
        id: string.isRequired,
        title: string.isRequired}).isRequired).isRequired,
    todosTags: arrayOf(shape({
        id: number.isRequired,
        taskId: string.isRequired,
        tagId: string.isRequired}).isRequired).isRequired,
    createTag: func.isRequired,
    deleteTag: func.isRequired
};

export default TagsPart;

