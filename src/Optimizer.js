import { useState } from 'react';
import { useEffect } from 'react';
import { useBetween } from 'use-between';
import { ShareablePopSizeState } from './PopSlider.js';
import { ShareableProbeParams } from './Buttons.js';  
import NodeFetch from 'node-fetch';

const endPointAddress = 'http://127.0.0.1:8000'; // TODO: Use environment variable

export const ShareableRunningState = () => {
    const [running, setRunning] = useState(false);
    return {
        running,
        setRunning
    };
};

export const ShareableFinishedState = () => {
    const [finished, setFinished] = useState(false);
    return {
        finished,
        setFinished
    };
};

export const ShareableOutputState = () => {
    const [output, setOutput] = useState(null);
    return {
        output,
        setOutput
    };    
};

export const ShareableWarningState = () => {
    const [warning, setWarning] = useState('');
    return {
        warning,
        setWarning
    };    
};

async function runOptimizer(finalParams, popSize) {
    var endPoint = endPointAddress.concat('/start_optimizer');
    finalParams.params.temperature = parseFloat(finalParams.params.temperature);
    finalParams.params.sodium = parseFloat(finalParams.params.sodium)/1000.0;
    finalParams.params.magnesium = parseFloat(finalParams.params.magnesium)/1000.0;
    return NodeFetch(endPoint,
    {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({'probeParams': finalParams, 'popSize': popSize})
    }).then(response => {
        if(response.status >= 400) {
            throw new Error('Bad response from server');
        }
        else {
            return response.json();
        }
    })
};

const Optimizer = () => {

    const { probeParams } = useBetween(ShareableProbeParams);
    const { setRunning } = useBetween(ShareableRunningState);
    const { setFinished } = useBetween(ShareableFinishedState);
    const { setOutput } = useBetween(ShareableOutputState);
    const { popSize } = useBetween(ShareablePopSizeState);
    const { setWarning } = useBetween(ShareableWarningState);

    // Run on mount
    useEffect(() => {
        let mounted = true;
        let params = JSON.parse(JSON.stringify(probeParams));
        runOptimizer(params, popSize)
        .then(output => {
            if(mounted) {
                setOutput(output);
                setFinished(true);
                setRunning(false);
            }
        }).catch(err => {
            console.log(err);
            setWarning('An error occurred while connecting to the optimization server. Please try again.');
            setFinished(false);
            setRunning(false);
        })
        return () => mounted = false;
    // eslint-disable-next-line 
    }, []);

    return null;
};

export default Optimizer;