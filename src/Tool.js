import React from 'react';
import SequenceEntry from './SequenceEntry';
import Buttons from './Buttons';
import Output from './Output';

const Tool = () => {
    return (
      <div className="Home">
        <h1>[ START DESIGNING ]</h1>
        <SequenceEntry />
        <Buttons />
        <h1>[ OUTPUT ]</h1>
        <Output />
      </div>
    );

};

export default Tool;