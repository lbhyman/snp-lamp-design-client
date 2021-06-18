import { ShareableRunningState, ShareableOutputState, ShareableFinishedState, ShareableWarningState } from './Optimizer.js';
import Optimizer from './Optimizer.js';
import Button from '@material-ui/core/Button';
import { useState, useReducer, useEffect } from 'react';
import { useBetween } from 'use-between';

export const ShareableProbeParams = () => {
    var params = {
        WT:'',
        SNP:'',
        minlength:6,
        mut_rate:0.5,
        concentrations:{non_mut_target:1e-7, mut_target:1e-7, probeF:1e-7, probeQ:1e-7, sink:1e-7, sinkC:1e-7},
        params:{temperature:'', sodium:'', magnesium:''},
        beta:[0,0,0,0],
        truncations:[]
    };
    const [probeParams, setProbeParams] = useState(params);
    return {
        probeParams,
        setProbeParams
    };
};

const screenSequence = (sequence) => {
    var seqArray = sequence.split('');
    var allowedChars = 'ACTGactg'
    for (let i = 0; i < seqArray.length; i++) {
        if (!allowedChars.includes(seqArray[i])) {
            return false;
        }
    }
    return true;
}

// Check whether the user has provided valid input and generate a warning to show
const screenInput = (probeParams) => {
    var temperature = parseFloat(probeParams.params.temperature);
    var sodium = parseFloat(probeParams.params.sodium);
    var magnesium = parseFloat(probeParams.params.magnesium);
    if (isNaN(temperature) || isNaN(sodium) || isNaN(magnesium)) {
        return 'Temperature, [Sodium], and [Magnesium] must be numeric.';
    }
    else if (temperature > 100.0 || temperature < 0.0) {
        return 'Temperature must be in the range 0-100C.';
    }
    else if (magnesium > 100.0) {
        return 'Magnesium must be in the range 0-100mM';
    }
    else if (sodium > 500.0 || sodium < 10.0) {
        return 'Sodium must be in the range 10-500mM';
    }
    else if (probeParams.WT.length < 10 || probeParams.WT.length > 100) {
        console.log(probeParams);
        return 'Sequence lengths must be in the range 10-100 bases.';
    }
    else if (probeParams.SNP.length < 10 || probeParams.SNP.length > 100) {
        console.log(probeParams);
        return 'Sequence lengths must be in the range 10-100 bases.';
    }
    else if (!screenSequence(probeParams.SNP) || !screenSequence(probeParams.WT)) {
        return 'Sequences must be DNA.';
    }
    else if (probeParams.SNP.length !== probeParams.WT.length) {
        return 'Sequences must be of equal length.';
    }
    else {
        return '';
    }
};

const Buttons = () => {

    const { running, setRunning } = useBetween(ShareableRunningState);
    const { setOutput } = useBetween(ShareableOutputState);
    const { setFinished } = useBetween(ShareableFinishedState);
    const { setWarning } = useBetween(ShareableWarningState);
    const { probeParams } = useBetween(ShareableProbeParams);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        forceUpdate();
    }, [running]);

    const HandleStart = () => {
        forceUpdate();
        console.log(probeParams);
        console.log(probeParams.params);
        var warning = screenInput(probeParams);
        setWarning(warning);
        if (warning === '') {
            setFinished(false);
            setOutput(null);
            setRunning(true);
        }
    };

    const HandleStop = () => {
        forceUpdate();
        console.log(probeParams);
        setRunning(false);
        setOutput(null);
        setFinished(false);
    };

    return (
        <div className="startstopbuttons">
            <Button className='startbutton' variant="contained" disabled={running} color="primary" onClick={HandleStart}>
                Optimize
            </Button>
            <Button className='stopbutton' variant="contained" disabled={!running} color="default" onClick={HandleStop}>
                Stop
            </Button>
            {running && <Optimizer />}
        </div>
    )
};

export default Buttons;