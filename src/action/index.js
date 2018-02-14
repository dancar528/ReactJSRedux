
/* 1. add task */
export function addTask(task){
  return{
    type: 'ADD_TASK',
    task
  };
}
/* 2. edit task */
export function editTask(task){
  return{
    type: 'EDIT_TASK',
    task
  };
}
/* 3. change state one task */
export function changeStatusTask(task){
  return{
    type: 'CHANGE_STATUS_TASK',
    task
  };
}
/* 4. change state all tasks */
export function updateAllStatus(complete){
  return{
    type: 'UPDATE_ALL_STATUS',
    complete
  };
}
/* 5. remove one task */
export function removeTask(id){
  return{
    type: 'REMOVE_TASK',
    id
  };
}
/* 6. Clear all completed task */
export function clearCompletedTasks(){
  return{
    type: 'CLEAR_COMPLETED_TASKS',
  };
}
