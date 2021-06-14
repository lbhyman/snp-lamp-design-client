import React from 'react';
import { ShareableRunningState, ShareableFinishedState, ShareableOutputState } from './Optimizer.js';
import { LoaderDots } from '@thumbtack/thumbprint-react';
import { useBetween } from 'use-between';

const Output = () => {
    const { running } = useBetween(ShareableRunningState)
    const { finished } = useBetween(ShareableFinishedState)
    const { output } = useBetween(ShareableOutputState)

    if (running) {
        return (
            <div className="progress">
                <h2>Optimization in Progress...</h2>
                <LoaderDots size="medium" />
            </div>
        );
    }
    else if (finished) {
        return (
            <div className="outputsequences">
                <h2>Output</h2>
                <div className="sequencelabels">
                    <p>ProbeF: </p>
                    <p>ProbeQ: </p>
                    <p>Sink: </p>
                    <p>Sink*: </p>
                </div>
                <div className="outsequences">
                    <p>{output['probeF']}</p>
                    <p>{output['probeQ']}</p>
                    <p>{output['sink']}</p>
                    <p>{output['sinkC']}</p>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="emptyoutput">
                <h2>Output</h2>
            </div>
        );
    }

};

export default Output;