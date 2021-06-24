import { useEffect, useReducer } from 'react';
import { ShareableRunningState, ShareableFinishedState, ShareableOutputState, ShareableWarningState } from './Optimizer.js';
import { LoaderDots } from '@thumbtack/thumbprint-react';
import { useBetween } from 'use-between';

const Output = () => {
    const { running } = useBetween(ShareableRunningState)
    const { finished } = useBetween(ShareableFinishedState)
    const { output } = useBetween(ShareableOutputState)
    const { warning } = useBetween(ShareableWarningState)
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        forceUpdate();
        console.log('Output.js');
        console.log(running);
        console.log(output);
    }, [running, finished, output, warning]);

    if (warning !== '') {
        return (
            <div className="warning">
                <h3 className="warningheader">Unable to complete run</h3>
                <p className="warningtext">{ warning }</p>
            </div>
        )
    }
    else if (running) {
        return (
            <div className="progress">
                <h3 className="proglabel">Optimization in Progress</h3>
                <LoaderDots size="medium" className="progindicator" />
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