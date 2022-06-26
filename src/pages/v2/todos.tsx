import React from 'react';
import Tabs from '../../components/Tabs';

interface IProps {
  children?: React.ReactNode;
}

const { Tab } = Tabs;

function Todos(props: IProps) {
  return (
    <section className='flex flex-col items-center h-screen'>
      <h1 className='font-bold text-3xl py-10'>#Todo</h1>

      <div className='w-2/5'>
        <Tabs>
          <Tab id={1} title={`All`}>
            <div className='space-x-5 py-5 flex justify-between items-center'>
              <input
                type='text'
                placeholder='Todo...'
                name=''
                id=''
                className='text-sm | py-3.5 w-4/5 px-3 focus:outline-none outline-none | border border-gray-300 focus:border-[#2F80ED] focus:shadow-sm shadow-[#2F80ED] rounded-xl duration-200'
              />
              <button
                type='submit'
                className='font-semibold text-sm | bg-[#2F80ED] w-1/5 text-white px-7 py-3.5 rounded-lg active:scale-95 duration-200'
              >
                Add
              </button>
            </div>
          </Tab>

          <Tab id={2} title={`Active`}>
            <div className='bg-blue-300 w-full h-64'></div>
          </Tab>

          <Tab id={3} title={`Completed`}>
            <div className='bg-indigo-300 w-full h-64'></div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}

export default Todos;
