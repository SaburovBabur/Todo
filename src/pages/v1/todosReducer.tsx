// import React, { useEffect, useReducer, useState } from 'react';
// import Map from '../components/Map';
// import produce from 'immer';

// interface IProps {
//   children?: React.ReactNode;
// }

// interface Todo {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// }
// // ===

// type TodoActions =
//   | 'ADD'
//   | 'TOGGLE'
//   | 'DELETE'
//   | 'DELETE_ALL'
//   | 'UNCHECK_ALL'
//   | 'CHECK'
//   | 'CHECK_ALL'
//   | 'DELETE_ALL'
//   | 'INIT'
//   | 'DELETE';

// // ===

// function hasIdProperty(prop: any): boolean {
//   if (!prop || typeof prop != 'object' || !('id' in prop)) {
//     return true;
//   }

//   return false;
// }

// function todoReducer(
//   state: Todo[],
//   { type, payload }: { type: TodoActions; payload?: any }
// ) {
//   return produce(state, (draft) => {
//     switch (type) {
//       case 'INIT':
//         return (draft = payload);

//       case 'CHECK_ALL':
//         return draft.forEach((todo: Todo) => {
//           todo.completed = true;
//         });

//       case 'TOGGLE':
//         if (hasIdProperty(payload)) {
//           throw new Error('Todo ID for TOGGLE dispatch is not provided!');
//         }

//         const todo = draft.find((todo) => todo.id == payload!.id);

//         if (todo != null) {
//           todo.completed = !todo.completed;
//         }

//         break;

//       case 'DELETE_ALL':
//         return [];

//       case 'UNCHECK_ALL':
//         return draft.forEach((todo: Todo) => {
//           todo.completed = false;
//         });

//       default:
//         console.error(`Non existing Todo dispatch type!`);
//         return state;
//     }
//   });
// }

// type FetchState = 'LOADING' | 'ERROR' | 'SUCCESS';

// function Todos(props: IProps) {
//   const [todos, dispatch] = useReducer(todoReducer, [] as Todo[]);
//   const [todoLoadingState, setTodoLoadingState] = useState<FetchState>();

//   useEffect(() => {
//     setTodoLoadingState('LOADING');

//     async function fetchTodos() {
//       try {
//         const res = await fetch(
//           `https://jsonplaceholder.typicode.com/todos?userId=1`
//         );

//         const data = await res.json();

//         dispatch({ type: 'INIT', payload: data as Todo[] });

//         setTodoLoadingState('SUCCESS');
//       } catch (error) {
//         setTodoLoadingState('ERROR');

//         throw new Error('Error while loading!!!');
//       }
//     }

//     fetchTodos();
//   }, []);

//   useEffect(() => {
//     console.log(todos, todoLoadingState);
//   }, [todos]);

//   return (
//     <>
//       <h1>Daily TODOS Reducer</h1>
//       <ul>
//         {/* <IF>
//           <ELSE if={todoLoadingState === 'LOADING'}>Loading...</ELSE>

//           <ELSE if={todoLoadingState === 'SUCCESS' && Array.isArray(todos)}>
//             ...
//           </ELSE>

//           <ELSE if={todos.length === 0}>+Create task</ELSE>

//           <ELSE if={todoLoadingState === 'ERROR'}>Error</ELSE>
//         </IF> */}

//         {(() => {
//           if (todoLoadingState === 'LOADING') {
//             return 'Loading';
//           } else if (
//             todoLoadingState === 'SUCCESS' &&
//             Array.isArray(todos) &&
//             todos.length !== 0
//           ) {
//             return (
//               <Map datas={todos}>
//                 {(todo, idx) => (
//                   <li key={idx}>
//                     <label htmlFor={`todo_${idx}`} style={{ display: 'flex' }}>
//                       <>
//                         <input
//                           onChange={() =>
//                             dispatch({
//                               type: 'TOGGLE',
//                               payload: { id: todo.id },
//                             })
//                           }
//                           checked={todo.completed}
//                           type='checkbox'
//                           name={`todo[]`}
//                           id={`todo_${idx}`}
//                         />

//                         <p
//                           style={{
//                             padding: '0',
//                             margin: 0,
//                             textDecoration: todo.completed
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
//           } else if (todoLoadingState === 'SUCCESS' && todos.length === 0) {
//             return '+Create task';
//           } else if (todoLoadingState === 'ERROR') {
//             return 'Error';
//           }
//         })()}
//       </ul>

//       <button onClick={() => dispatch({ type: 'CHECK_ALL' })}>
//         Complete ALL
//       </button>
//       <button onClick={() => dispatch({ type: 'DELETE_ALL' })}>
//         Remove ALL
//       </button>
//       <button onClick={() => dispatch({ type: 'UNCHECK_ALL' })}>
//         Uncheck ALL
//       </button>
//     </>
//   );
// }

// export default Todos;

import React from 'react';

function todosReducer() {
  return <div>todosReducer</div>;
}

export default todosReducer;
