import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import {func} from 'prop-types';

class TagInput extends Component {
    constructor(props) {
        super(props);
        this.state = {title: ''};
    }

    onChange = event => this.setState({title: event.target.value});

    onSubmit = () => {
        this.props.handleSubmit(this.state.title);
        this.setState({title: ''});
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input size='large' action='Add' placeholder='Add tag...' type='text' onChange={this.onChange} value={this.state.title} />
                </Form.Group>
            </Form>
        );
    }
}

TagInput.propTypes = {
    handleSubmit: func.isRequired
};

export default TagInput;
