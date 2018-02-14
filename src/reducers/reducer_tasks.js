export default function(state = [],action){
  switch (action.type) {
    case 'ADD_TASK':
    return[
      ...state,
      {
        id: action.task.id,
        task: action.task.task,
        complete: action.task.complete
      }
    ]
    break;
    case 'EDIT_TASK':
    state[state.findIndex(task => task.id == action.task.id)].task = action.task.task
    return [
      ...state,
    ];
    case 'CHANGE_STATUS_TASK':
    state[state.findIndex(task => task.id == action.task.id)].complete = action.task.complete
    return [
      ...state,
    ];
    case 'UPDATE_ALL_STATUS':
    state.find(function(task){
      task.complete = action.complete;
    });
    return [
      ...state,
    ];
    break;
    case 'REMOVE_TASK':
    return state.filter(task => task.id !== action.id)
    break;
    case 'CLEAR_COMPLETED_TASKS':

    return state.filter(task => task.complete !== 1)
    break;
    default:
    return state
  }

}
