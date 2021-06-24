import { useState } from 'react';
import { useEffect } from 'react';
import { useBetween } from 'use-between';
import { ShareablePopSizeState } from './PopSlider.js';
import { ShareableProbeParams } from './Buttons.js';  
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
        console.log(response); 
        // AWS API Gateway will generally timeout before the optimizer is finished. This is normal behavior.
        if(response.status === 408 || response.status === 504) {
            return {status: 'running'};
        }
        // Other errors when connecting to AWS
        else if(response.status >= 400) {
            throw new Error('Bad response from server');
        }
        else {
            return response.json();
        }
    })
}

async function getOutput(finalParams, popSize, attempt, maxAttempts) {
    var endPoint = process.env.REACT_APP_ENDPOINTADDRESS.concat('/get_output');
    finalParams.params.temperature = parseFloat(finalParams.params.temperature);
    finalParams.params.sodium = parseFloat(finalParams.params.sodium)/1000.0;
    finalParams.params.magnesium = parseFloat(finalParams.params.magnesium)/1000.0;
    return NodeFetch(endPoint,
    {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({'probeParams': finalParams, 'popSize': popSize})
    }).then(response => {
        console.log(response); 
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
    const { setRunning } = useBetween(ShareableRunningState);
    const { setFinished } = useBetween(ShareableFinishedState);
    const { setOutput } = useBetween(ShareableOutputState);
    const { popSize } = useBetween(ShareablePopSizeState);
    const { setWarning } = useBetween(ShareableWarningState);
    const [attempts, setAttempts] = useState(0);
    const [finalParams, ] = useState(JSON.parse(JSON.stringify(probeParams)));
    const [finalPopSize, ] = useState(JSON.parse(JSON.stringify(popSize)));

    // Run on mount
    useEffect(() => {
        let mounted = true;
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
            setWarning('An error occurred while connecting to the optimization server. Please try again.');
            setFinished(false);
            setRunning(false);
        })
        // Periodically check output
        try {
            var interval = setInterval(async () => {
                var output = await getOutput(finalParams, finalPopSize, attempts, maxReattempts);
                if(output.hasOwnProperty('status')) {
                    if(output.status === 'error') {
                        if(mounted) {
                            setAttempts(attempts + 1);
                        }     
                    }
                }
                else { 
                    if(mounted) {
                        setOutput(output);
                        setFinished(true);
                        setRunning(false);
                    }
                }
            }, 5000);
        }
        catch(err) {
            console.log(err);
            setWarning('An error occurred while connecting to the optimization server. Please try again.');
            setFinished(false);
            setRunning(false);
        }
        return () => {
            mounted = false;
            clearInterval(interval);
        }
    // eslint-disable-next-line 
    }, []);

    return null;
};

export default Optimizer;