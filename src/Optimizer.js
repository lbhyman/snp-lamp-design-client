import { useState } from 'react';
import { useEffect } from 'react';
import { useBetween } from 'use-between';
import { ShareablePopSizeState } from './PopSlider.js';
import { ShareableProbeParams } from './Buttons.js';
import useInterval from './useInterval.js';
import NodeFetch from 'node-fetch';

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
    var endPoint = process.env.REACT_APP_ENDPOINTADDRESS.concat('/start_optimizer');
    finalParams.params.temperature = parseFloat(finalParams.params.temperature);
    finalParams.params.sodium = parseFloat(finalParams.params.sodium)/1000.0;
    finalParams.params.magnesium = parseFloat(finalParams.params.magnesium)/1000.0;
    return NodeFetch(endPoint,
    {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({'probeParams': finalParams, 'popSize': popSize})
    }).then(response => {
        // AWS API Gateway will generally timeout before the optimizer is finished. This is normal behavior.
        if(response.status === 408 || response.status === 504) {
            return {running: 'true'};
        }
        // Other errors when connecting to AWS
        else if(response.status >= 400) {
            return {running: 'true'};
        }
        else {
            return response.json();
        }
    })
}

async function getOutput(finalParams, popSize, attempt, maxAttempts) {
    var endPoint = process.env.REACT_APP_ENDPOINTADDRESS.concat('/get_output');
    finalParams.params.temperature = parseFloat(finalParams.params.temperature);
    finalParams.params.sodium = parseFloat(finalParams.params.sodium);
    finalParams.params.magnesium = parseFloat(finalParams.params.magnesium);
    return NodeFetch(endPoint,
    {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({'probeParams': finalParams, 'popSize': popSize})
    }).then(response => {
        if(response.status >= 400 && attempt > maxAttempts) {
            throw new Error('Bad response from server');
        }
        else if (response.status >= 400) { 
            return {status: 'error'};
        }
        else {
            return response.json();
        }
    })    
}

const Optimizer = () => {

    const maxReattempts = 5;

    const { probeParams } = useBetween(ShareableProbeParams);
    const { running, setRunning } = useBetween(ShareableRunningState);
    const { setFinished } = useBetween(ShareableFinishedState);
    const { setOutput } = useBetween(ShareableOutputState);
    const { popSize } = useBetween(ShareablePopSizeState);
    const { setWarning } = useBetween(ShareableWarningState);
    const [attempts, ] = useState(0);
    const [finalParams, ] = useState(JSON.parse(JSON.stringify(probeParams)));
    const [finalPopSize, ] = useState(JSON.parse(JSON.stringify(popSize)));
    const [startTime, setStartTime] = useState(0);

    // Run on mount
    useEffect(() => {
        let mounted = true;
        setStartTime(Date.now());
        // Start Optimizer
        runOptimizer(finalParams, finalPopSize)
        .then(output => {
            if(mounted) {
                setOutput(output);
                setFinished(true);
                setRunning(false);
            }
        }).catch(err => {
            console.log(err);
        })

        return () => {
            mounted = false;
        }
    // eslint-disable-next-line 
    }, []);

    // Periodically check output
    useInterval(() => {
        var elapsedTime = Date.now() - startTime;
        getOutput(finalParams, finalPopSize, attempts, maxReattempts)
        .then(output => {
            if(output.running === 'false') { 
                console.log('done');
                setOutput(output);
                setFinished(true);
                setRunning(false);
                console.log(running);
            }
            // Timeout after 5 minutes
            else if(elapsedTime > 300000) {
                throw new Error('Optimization run timeout');
            }
        })
        .catch(err => {
            console.log(err);
            if(elapsedTime > 300000) {
                setWarning('Optimization run timed out. Please try again.');
                setFinished(false);
                setRunning(false);
            }   
        });
    }, 5000);

    return null;
};

export default Optimizer;