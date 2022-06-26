// import React, { useState } from 'react';
// import { RootState, useDispatch, useStore } from '../../Store/v1';
// import { decrement, increment, incrementByAmount } from '../v1/Store/Counter';

// export function Counter() {
//   // const { count, incrementCount } = useCount();

//   const count = useStore((state: any) => state.counter.value);
//   const dispatch = useDispatch();
//   const [input, setInput] = useState('');

//   function onIncrement(e: React.MouseEvent<HTMLButtonElement>) {
//     dispatch(increment());
//   }

//   function onChange(e: React.ChangeEvent<HTMLInputElement>) {
//     console.log(e.currentTarget.value, 'ChangeEvent');
//     setInput(e.target.value);
//   }

//   const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     console.log(event.currentTarget.value, 'KeyboardEvent');

//     if (event.code === 'Enter') {
//       dispatch(incrementByAmount(+input));
//     }
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor='amount'>
//           <input
//             type='number'
//             placeholder='0'
//             id='amount'
//             name='amount'
//             onChange={onChange}
//             onKeyUp={onEnter}
//           />
//         </label>
//         <br />

//         <button aria-label='Increment value' onClick={onIncrement}>
//           Increment
//         </button>

//         <span style={{ padding: `1em`, display: 'block' }}>{count}</span>

//         <button
//           aria-label='Decrement value'
//           onClick={() => dispatch(decrement())}
//         >
//           Decrement
//         </button>
//       </div>
//     </div>
//   );
// }

import React from 'react';

function count() {
  return <div>count</div>;
}

export default count;
