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
            <div className='bg-gray-300 w-full h-64'></div>
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
