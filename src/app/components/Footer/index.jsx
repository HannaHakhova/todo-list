import React, {Component} from 'react';
import {Menu, Button, Icon, Label} from 'semantic-ui-react';
import {arrayOf, func, shape, string, bool} from 'prop-types';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {activeItem: 'all'};
    }

    handleItemClick = (e, {name}) => {
        this.props.handleActiveItemChange(name);
        this.setState({activeItem: name});
    };

    render() {
        const {activeItem} = this.state;

        return (
            <Menu pointing secondary >
                <Menu.Item as='label' name='all' active={activeItem === 'all'} onClick={this.handleItemClick}>
                    <Icon name='list layout' /> All
                    <Label color='orange'>{this.props.todos.length}</Label>
                </Menu.Item>
                <Menu.Item as='label' name='completed' active={activeItem === 'completed'} onClick={this.handleItemClick}>
                    <Icon name='check' /> Completed
                    <Label color='teal' >{this.props.todos.filter(todo => todo.completed).length}</Label>
                </Menu.Item>
                <Menu.Item as='label' name='pending' active={activeItem === 'pending'} onClick={this.handleItemClick}>
                    <Icon name='hourglass end' /> Pending
                    <Label color='red' >{this.props.todos.filter(todo => !todo.completed).length}</Label>
                </Menu.Item>
                <Menu.Item>
                    <Button color='teal' onClick={this.props.handleClearCompleted} >
                        <Icon name='trash' /> Clear completed
                    </Button>
                </Menu.Item>
            </Menu>);
    }
}

Footer.propTypes = {
    todos: arrayOf(shape({
        title: string.isRequired,
        completed: bool.isRequired
    }).isRequired).isRequired,
    handleClearCompleted: func.isRequired,
    handleActiveItemChange: func.isRequired
};