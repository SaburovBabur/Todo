import React from 'react';
import Tabs from '../../components/Tabs';

interface IProps {
  children?: React.ReactNode;
}

const { Tab } = Tabs;

function Todos(props: IProps) {
  return (
    <>
      <h1>#Todo</h1>

      <Tabs>
        <Tab id={1} title={`All`}>
          <div className='bg-gray-300 w-64 h-64'></div>
        </Tab>

        <Tab id={2} title={`Active`}>
          <div className='bg-blue-300 w-64 h-64'></div>
        </Tab>

        <Tab id={3} title={`Completed`}>
          <div className='bg-indigo-300 w-64 h-64'></div>
        </Tab>
      </Tabs>
    </>
  );
}

export default Todos;
