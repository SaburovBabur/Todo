// import React, { useEffect, useReducer, useState } from 'react';
// import { RootState, useDispatch, useStore } from '../Store';
// import {
//   add,
//   toggle,
//   completeAll,
//   removeAll,
//   unCompletteAll,
//   useGetTodosQuery,
//   useToggleTodoMutation,
// } from '../Store/Todos';

// import Map from '../components/Map';

// interface IProps {
//   children?: React.ReactNode;
// }

// interface Todo {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// }

// function Todos(props: IProps) {
//   // const todos = useStore((state) => state.todos);
//   const dispatch = useDispatch();
//   const {
//     data: todos,
//     isLoading,
//     isSuccess,
//     isError,
//     error,
//   } = useGetTodosQuery('todos');

//   const [completeTodo, result] = useToggleTodoMutation();

//   return (
//     <>
//       <h1>Daily TODOS Reducer</h1>
//       <ul>
//         {(() => {
//           if (isLoading) {
//             return 'Loading';
//           } else if (isSuccess && Array.isArray(todos) && todos.length !== 0) {
//             return (
//               <Map datas={todos}>
//                 {(todo, idx) => (
//                   <li key={idx}>
//                     <label htmlFor={`todo_${idx}`} style={{ display: 'flex' }}>
//                       <>
//                         <input
//                           onChange={() => completeTodo({ todoId: todo.id })}
//                           checked={todo.completedAt ? true : false}
//                           type='checkbox'
//                           name={`todo[]`}
//                           id={`todo_${idx}`}
//                         />

//                         <p
//                           style={{
//                             padding: '0',
//                             margin: 0,
//                             textDecoration: todo.completedAt
//                               ? 'line-through'
//                               : 'none',
//                           }}
//                         >
//                           {todo.title}
//                         </p>
//                       </>
//                     </label>
//                   </li>
//                 )}
//               </Map>
//             );
//           } else if (isSuccess && Array.isArray(todos) && todos.length === 0) {
//             return '+Create task';
//           } else if (isError) {
//             return error.toString();
//           }
//         })()}
//       </ul>

//       <button onClick={() => dispatch(completeAll())}>Complete ALL</button>
//       <button onClick={() => dispatch(removeAll())}>Remove ALL</button>
//       <button onClick={() => dispatch(unCompletteAll())}>Uncheck ALL</button>
//     </>
//   );
// }

// export default Todos;

import React from 'react';

function todos() {
  return <div>todos</div>;
}

export default todos;
