/*
 * @Author: qianlu
 * @Date:   2016-11-10 09:46:07
 * @Last Modified by:   qianlu
 * @Last Modified time: 2017-02-15 11:03:03
 */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import LocalDb from 'localDb';
import TodoHeader from './TodoHeader.js';
import TodoMain from './TodoMain.js';
import TodoFooter from './TodoFooter.js';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            isAllChecked: false
        }
    }

    // 判断是否所有任务的状态都完成，同步底部的全选框
    allChecked() {
        let isAllChecked = false;
        if (this.state.todos.every(todo => todo.isDone)) {
            isAllChecked = true;
        }
        this.setState({
            todos: this.state.todos,
            isAllChecked: isAllChecked
        })
    }

    // 添加任务，传递给TodoHeader的方法
    addTodo(todoItem) {
        this.state.todos.push(todoItem);
        this.allChecked();
    }

    // 清除已完成的任务，传递给TodoItem的方法
    deleteTodo(index) {
        this.state.todos.splice(index, 1);
        this.setState({
            todos: this.state.todos
        });
    }

    // 清除已完成的任务，传递给TodoFooter的方法
    clearDone() {
        let todos = this.state.todos.filter(todo => !todo.isDone);
        this.setState({
            todos: todos,
            isAllChecked: false
        });
    }

    // 改变任务状态，传递给TodoItem和Footer组件的方法
    changeTodoState(index, isDone, isChangeAll=false) {
        if(isChangeAll) {   // 全部操作
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked:isDone
            });
        } else {    // 操作其中一个todo
            this.state.todos[index].isDone = isDone;
            this.allChecked();
        }
    }

    render() {
        let info = {
            isAllChecked: this.state.isAllChecked,
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter(todo => todo.isDone)).length || 0
        };
        return (
            <div className="todo-wrap">
                <TodoHeader addTodo={this.addTodo.bind(this)}/>
                <TodoMain 
                    todos={this.state.todos}
                    deleteTodo={this.deleteTodo.bind(this)}
                    changeTodoState={this.changeTodoState.bind(this)}
                />
                <TodoFooter 
                    {...info}
                    changeTodoState={this.changeTodoState.bind(this)}
                    clearDone={this.clearDone.bind(this)}
                />
            </div>
        );
    }
}