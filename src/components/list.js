import React, { Component } from 'react';
import { connect } from 'react-redux';
import {removeTask,editTask,changeStatusTask,clearCompletedTasks } from '../action/index';
import { bindActionCreators } from 'redux';

var completed =0, active=0;/* count completed task and active task */

class List extends Component {
  state={text:'',filter:-1}

  /* 1. When you change the text of a task */
  _onchange(e){
    this.setState({text:e.target.value})
  }
  /* 2. makes possible you can change the text of a task */
  _enableEdit = (id,e)=> {
    /* hidden editor boxes */
    document.querySelectorAll(".content_textbox").forEach(
      content_textbox => {
        content_textbox.classList.add('hidden')
        content_textbox.previousSibling.classList.remove('hidden')
      }
    );
    /*  makes invisible the parent and make visible editor box and set focus */
    e.target.parentNode.classList.add('hidden');
    document.getElementById(id).classList.remove('hidden');
    document.querySelector("div#"+id+" form input").focus();
  }
  /* 3. Edit task */
  handleEdit = (id,e) => {
    e.preventDefault()
    let task = {task:this.state.text,id:id}
    this.props.editTask(task)
    /* make invisble editor box */
    e.target.parentNode.classList.add('hidden');
    document.getElementById('ch'+id).classList.remove('hidden');
  }
  /* 4. change status one task */
  _onchangeStatus(id,e){
    let complete = e.target.checked ? 1 : 0;

    let task = {complete:complete,id:id}
    this.props.changeStatusTask(task)
  }

  /* 5. Filter of task */
  showTask(filter,e){
    document.querySelectorAll(".button").forEach(
      button => {
        button.classList.remove('active')
      }
    );
    e.target.classList.add('active')
    this.setState({filter:filter})
  }
  /* 6. Clear completed tasks */
  clearCompleted(e){
    this.props.clearCompletedTasks();
    this.setState({filter:-1})
  }

  renderList(){
    /* restart vars */
    completed = 0;
    active = 0;

    return this.props.tasks.map((task,key)=>{

      /* to invisible task based in the filter */
      let classcss ='item hidden';

      if(this.state.filter==task.complete || this.state.filter == -1){
        /* show completed or show active */
        classcss = 'item';
      }

      /* setting status */
      let status = (task.complete=='1')?true:false;
      /* design completed task */
      let classcssdescription = (task.complete=='1')?'description completed':'description';

      /* counters completed tasks and atives tasks */
      if(task.complete=='1'){completed++;}else{active++;}

      return(
        <div
          key={task.id}
          className={classcss}>
          <div className="content_checkbox" id={'ch'+task.id}>
            <label className="checkbox">
              <input onChange={this._onchangeStatus.bind(this,task.id)} checked={status} type="checkbox" name="state"/>
              <span className="checkmark"></span>
            </label>
            <div
              onDoubleClick={this._enableEdit.bind(this,'tx'+task.id)}
              className={classcssdescription} >{task.task}</div>
            <div
              onClick={() => this.props.removeTask(task.id)}
              className="delete" >X</div>
          </div>
          <div className="content_textbox hidden" id={'tx'+task.id}>
            <form onSubmit={this.handleEdit.bind(this,task.id)}>
              <input onChange={this._onchange.bind(this)} name="textbox" type="text" placeholder="task"/>
            </form>
          </div>
        </div>
      );
    })
  }
  render() {
    console.log(this.props);
    return (
      <div className="list">
        {this.renderList()}
        <div className="content_button">
          <div className="left">
            <div>{active} items left</div>
          </div>
          <div className="filter">
            <div onClick={this.showTask.bind(this,-1)} className="button">All</div>
            <div onClick={this.showTask.bind(this,0)} className="button">Active</div>
            <div onClick={this.showTask.bind(this,1)} className="button">Completed</div>
          </div>
          <div className="right">
            <div onClick={this.clearCompleted.bind(this)} className={(completed>0) ? "clear_complete" : "clear_complete hidden"}>Clear completed ({completed})</div>
          </div>
        </div>

      </div>
    );
  }
}
/* Trae instancia de estado app */
function mapStateToProps(state){
  console.log("state: ",state);
  return{
    tasks: state.tasks
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ editTask: editTask,removeTask: removeTask, changeStatusTask:changeStatusTask,clearCompletedTasks:clearCompletedTasks },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(List);
