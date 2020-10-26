import React, { useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo } from '../redux/actions';

const AddTodo = ({ addTodo }) => {
  const [todo, setTodo] = useState('');
  return (
    <div>
      <input
        onChange={e => setTodo(e.target.value)}
        value={todo}
      />
      <button onClick={() => {
        addTodo(todo);
        setTodo('');
      }}>Add</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addTodo
}, dispatch);

export default connect(null, mapDispatchToProps)(AddTodo);
