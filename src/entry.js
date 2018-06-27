/*
 * @Author: Ruth
 * @Date:   2016-11-02 11:25:44
 * @Last Modified time: 2016-11-14 15:42:04
 */

'use strict';

import '../asset/css/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class HelloMessage extends React.Component {
    render() {
        return <div className="bgColor">Hello {this.props.name}</div>
    }
}

ReactDOM.render(<HelloMessage name="aawerwea" />, document.getElementById('container'));