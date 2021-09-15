import React from 'react';
import SequenceEntry from './SequenceEntry';
import ConditionEntry from './ConditionEntry';
import Buttons from './Buttons';
import Output from './Output';

const Home = () => {
    return (
      <div className="Home">
        <h1>[ START DESIGNING ]</h1>
        <SequenceEntry />
        <ConditionEntry />
        <Buttons />
        <h1>[ OUTPUT ]</h1>
        <Output />
      </div>
    );

};

export default Home;