/*
* @Author: qianlu
* @Date:   2016-11-10 09:47:21
* @Last Modified by:   qianlu
* @Last Modified time: 2017-02-15 10:23:44
*/

'use strict';
import React from 'react';
import TodoItem from './TodoItem.js';

export default class TodoMain extends React.Component {
    render() {
        if (this.props.todos.length == 0) {
            return (
                <div className="todo-empty">恭喜您，目前没有待办任务！</div>
            )
        }
        return (
            <ul className="todo-main">
                {
                    this.props.todos.map((todo, index) => {
                        //{...this.props} 用来传递TodoMain的todos属性和delete、change方法。
                        return <TodoItem text={todo.text} isDone={todo.isDone} index={index} {...this.props}/>
                    })
                }
            </ul>
        );
    }
}