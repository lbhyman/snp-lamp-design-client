import { useState } from 'react';
import { useEffect } from 'react';
import { useBetween } from 'use-between';
import { ShareableProbeParams } from './Buttons.js';
import { ShareableRunningState, ShareableFinishedState, ShareableOutputState, ShareableWarningState } from './Output.js';
import NodeFetch from 'node-fetch';

async function runOptimizer(finalParams) {
    var endPoint = process.env.REACT_APP_ENDPOINTADDRESS.concat('/start_optimizer');
    finalParams.params.temperature = parseFloat(finalParams.params.temperature);
    finalParams.params.sodium = parseFloat(finalParams.params.sodium)/1000.0;
    finalParams.params.magnesium = parseFloat(finalParams.params.magnesium)/1000.0;
    return NodeFetch(endPoint,
    {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({'probeParams': finalParams})
    }).then(response => {
        return response.json();
    })
}

const Optimizer = () => {

    const { probeParams } = useBetween(ShareableProbeParams);
    // eslint-disable-next-line
    const { running, setRunning } = useBetween(ShareableRunningState);
    const { setFinished } = useBetween(ShareableFinishedState);
    const { setOutput } = useBetween(ShareableOutputState);
    const { setWarning } = useBetween(ShareableWarningState);
    const [finalParams, ] = useState(JSON.parse(JSON.stringify(probeParams)));
    // eslint-disable-next-line
    const [startTime, setStartTime] = useState(0);

    // Run on mount
    useEffect(() => {
        let mounted = true;
        setStartTime(Date.now());
        // Start Optimizer
        runOptimizer(finalParams)
        .then(output => {
            if(mounted) {
                setOutput(output);
                setFinished(true);
                setRunning(false);
            }
        }).catch(err => {
            console.log(err);
            setWarning('Optimization run timed out. Please try again.');
        })

        return () => {
            mounted = false;
        }
    // eslint-disable-next-line 
    }, []);

    return null;
};

export default Optimizer;