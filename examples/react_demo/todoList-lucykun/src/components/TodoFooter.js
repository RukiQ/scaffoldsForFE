/*
* @Author: qianlu
* @Date:   2016-11-10 09:47:30
* @Last Modified by:   qianlu
* @Last Modified time: 2017-02-15 11:03:29
*/

'use strict';

import React from 'react';

export default class TodoFooter extends React.Component {
    // 改变任务是否已完成的状态
    handlerSelectAll(e) {
        this.props.changeTodoState(null, e.target.checked, true);   // true表示全部操作
    }

    // 删除全部已完成的任务
    handlerDeletDone() {
        this.props.clearDone();
    }

    render() {
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" checked={this.props.isAllChecked} onChange={this.handlerSelectAll.bind(this)}/>全选
                </label>
                <span>
                    <span className="text-success">已完成{this.props.todoDoneCount}</span>
                    /全部{this.props.todoCount}
                </span>
                <button className="btn btn-danger" onClick={this.handlerDeletDone.bind(this)}>清除已完成任务</button>
            </div>
        );
    }
}