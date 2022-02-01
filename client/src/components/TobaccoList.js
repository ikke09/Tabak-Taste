import React from 'react';
import Tobacco from './Tobacco';

export default function TobaccoList(props) {
  return (
    <>
      { 
        props.tobaccos.map(tobacco => <Tobacco key={tobacco._id} model={tobacco} />)
    }</>
  );
}
