import React from 'react';
import SequenceEntry from './SequenceEntry';
import Buttons from './Buttons';
import Output from './Output';
import Slide from 'react-reveal/Fade';

const Tool = () => {
    return (
      <div className="Tool">
        <h1>[ START DESIGNING ]</h1>
        <Slide left>
          <div className='userInput'>
            <SequenceEntry />
            <Buttons />
          </div>
        </Slide>
        <h1>[ OUTPUT ]</h1>
        <Output />
      </div>
    );

};

export default Tool;