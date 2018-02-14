import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTask,updateAllStatus } from '../action/index';
import { bindActionCreators } from 'redux';

let id = 1/* used for asign id's to every task */

class Input extends Component {
  state={text:''}
  /* 1. Change state text */
  _onchange(e){
    this.setState({text:e.target.value})

  }
  /* 2. Update state all task when primary checkbox is pressed */
  _updateAllStatus(e){
    let complete = e.target.checked ? 1 : 0;
    this.props.dispatch(updateAllStatus(complete))
  }
  /* 3. Save one task */
  handleSave = e => {
    e.preventDefault()
    id++;
    let task = {task:this.state.text,id:id,complete:0}
    this.props.dispatch(addTask(task))
    document.getElementById('txt_task').value = '';
  }

  render() {
    return (
      <div className="content_input">
        <label className="checkbox">
          <input onChange={this._updateAllStatus.bind(this)} type="checkbox" name="state"/>
          <span className="checkmark"></span>
        </label>
        <form onSubmit={this.handleSave.bind(this)}>
          <input onChange={this._onchange.bind(this)} id="txt_task" name="textbox" type="text" placeholder="What needs to be done?"/>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({updateAllStatus:updateAllStatus},dispatch);
}
export default connect(mapDispatchToProps)(Input);
