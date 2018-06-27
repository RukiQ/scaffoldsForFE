import React, { Component } from 'react';

class Form extends Component {
    state = {
        name: 'Lucy',
        gender: 'Femail'
    };

    handleChange = (e, field) => {
        this.setState({
            [`${field}`]: e.target.value
        });
    }

    render() {
        const { name, gender } = this.state;

        return (
            <form>
                <p>Name：<input type="text" name="name" value={name} onChange={(e) => this.handleChange(e, 'name')} /></p>
                <p>Gender：<input type="text" name="gender" value={gender} onChange={(e) => this.handleChange(e, 'gender')} /></p>
            </form>
        );
    }
}

export default Form;