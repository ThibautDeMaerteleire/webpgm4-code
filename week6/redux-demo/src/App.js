import { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import Greeting from './components/Greeting';
import { GreetMe } from './redux/actions';
import store from './redux/store';

function App() {
  useEffect(() => store.dispatch(GreetMe('Tim')));
  return (
    <Provider store={store}>
      <div className="App">
        <Greeting />
        <AddTodo />
        <Todos />
      </div>
    </Provider>
  );
}

export default App;

// 1. Very simple...
// const hello = () => ('hello');
// const store = createStore(hello);
// console.log(store.getState());

// 2. Creating A Reducer
// const initialState = {
//   text: 'Hi',
//   otherState: 'Some Stuff'
// }

// const greeting = (state=initialState, action) => {
//   switch(action.type) {
//     case 'GREET_ME':
//       return { ...state, text: `Welcome ${action.name}` }
//     case 'GREET_WORLD':
//       return { ...state, text: 'Hello World' }
//     default:
//       return state;
//   }
// }

// // creating a store
// const store = createStore(
//   greeting,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// // dispatch the action
// store.dispatch({
//   type: 'GREET_WORLD',
//   name: 'Didier'
// });