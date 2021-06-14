import React from 'react';
import SequenceEntry from './SequenceEntry';
import ConditionEntry from './ConditionEntry';
import PopSlider from './PopSlider';
import Buttons from './Buttons';
import Output from './Output';
import Optimizer from './Optimizer';

function App() {
    return (
      <div className="App">
        <h1>SNP-LAMP Designer</h1>
        <SequenceEntry />
        <ConditionEntry />
        <PopSlider />
        <Buttons />
        <Output />
        <Optimizer />
      </div>
    );

}

export default App;
