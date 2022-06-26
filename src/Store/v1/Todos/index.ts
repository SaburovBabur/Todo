import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type TActions =
  | 'ADD'
  | 'TOGGLE'
  | 'DELETE'
  | 'DELETE_ALL'
  | 'UNCHECK_ALL'
  | 'CHECK'
  | 'CHECK_ALL'
  | 'DELETE_ALL'
  | 'INIT'
  | 'DELETE';

export interface ITodo {
  id: number;
  userId: number;
  title: string;
  completedAt: Date | null;
}

const initialState: ITodo[] = [
  {
    id: 1,
    userId: 2,
    title: `Work Out`,
    completedAt: new Date(),
  },
] as ITodo[];

export const counterSlice = createSlice({
  initialState,
  name: 'count',
  reducers: {
    add(state: ITodo[], { payload }: PayloadAction<ITodo>) {
      state.push(payload);
      return state;
    },

    completeAll(state: ITodo[]) {
      return state.forEach((todo: ITodo) => {
        todo.completedAt = new Date();
      });
    },

    toggle(state: ITodo[], { payload }: PayloadAction<number>) {
      if (payload == null && typeof payload == 'number') {
        throw new Error('Todo ID for TOGGLE dispatch is not provided!');
      }

      const todo = state.find((todo) => todo.id == payload);

      if (todo != null) {
        todo.completedAt = todo.completedAt ? null : new Date();
      }
    },

    removeAll(state: ITodo[]) {
      state = [];
      return state;
    },

    unCompletteAll(state: ITodo[]) {
      return state.forEach((todo: ITodo) => {
        todo.completedAt = null;
      });
    },
  },
});

// ===================================================

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo, string>({
      query: () => `todos?userId=1`,
    }),

    toggleTodo: builder.mutation<ITodo, ITodo>({
      query: ({ id }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },

        //==
        body: {
          id: 1,
          userId: 1,
          title: 'foo',
          completed: true,
        },
      }),

      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const updateResult = dispatch(
          todosApi.util.updateQueryData('getTodos', `todos`, (draft) => {
            draft.completedAt = new Date();

            // if (todo) {
            //   todo.completeAt = new Date();
            // }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          updateResult.undo();
        }
      },
    }),
  }),
});

export const { useGetTodosQuery, useToggleTodoMutation } = todosApi;

// ===================================================

// Action creators are generated for each case reducer function
export const { add, toggle, completeAll, removeAll, unCompletteAll } =
  counterSlice.actions;

export default counterSlice.reducer;

// =========

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
// useEffect(() => {
//   setTodoLoadingState('LOADING');

//   async function fetchTodos() {
//     try {
//       const res = await fetch(
//         `https://jsonplaceholder.typicode.com/todos?userId=1`
//       );

//       const data = await res.json();

//       dispatch({ type: 'INIT', payload: data as Todo[] });

//       setTodoLoadingState('SUCCESS');
//     } catch (error) {
//       setTodoLoadingState('ERROR');

//       throw new Error('Error while loading!!!');
//     }
//   }

//   fetchTodos();
// }, []);
