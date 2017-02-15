/*
* @Author: qianlu
* @Date:   2016-11-10 09:47:12
* @Last Modified by:   qianlu
* @Last Modified time: 2017-02-15 10:54:42
*/

'use strict';

import React from 'react';

export default class TodoHeader extends React.Component {
    handlerKeyUp(e) {
        if (e.keyCode === 13) {
            let value = e.target.value;
            if (!value) return false;
            let newTodoItem = {
                text: value,
                isDone: false
            };
            e.target.value = '';
            this.props.addTodo(newTodoItem);
        }
    }

    render() {
        return (
            <div className="todo-header">
                <input type="text" onKeyUp={this.handlerKeyUp.bind(this)}  placeholder="请输入你的任务名称，按回车键确认"/>
            </div>
        );
    }
}
