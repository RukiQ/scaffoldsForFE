import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Form from './Form';

class App extends Component {
    render() {
        return (
            <div>
                <h1>My React App!</h1>
                <Form />
            </div>
        );
    }
}

// export default hot(module)(App);
export default App;