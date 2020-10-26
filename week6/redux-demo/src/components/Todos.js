import React from 'react'
import { connect } from 'react-redux';

const Todos = ({ todos }) => {
  return (
    <div>
      <ul>
        {todos && todos.map((todo) => <li>{todo}</li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({ todos: state.todos.todos });

export default connect(mapStateToProps)(Todos)