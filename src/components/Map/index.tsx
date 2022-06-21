import React, { useId } from 'react';

interface IProps<T> {
  children: (data: T, idx: number | string) => React.ReactNode;
  datas: T[];
}

function Map<T>({ children, datas }: IProps<T>) {
  const id = useId();

  return (
    <>{datas.map((data: T, idx: number) => children(data, `${id}_${idx}`))}</>
  );
}

export default Map;
