import { ShareableRunningState, ShareableOutputState, ShareableFinishedState, ShareableWarningState } from './Output.js';
import Optimizer from './Optimizer.js';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core';
import { createTheme }  from '@material-ui/core/styles'
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

// Check whether the user has provided valid input and generate a warning otherwise
const screenInput = (probeParams) => {
    if (probeParams.WT.length < 20 || probeParams.WT.length > 60) {
        return 'Sequence lengths must be in the range 20-60 bases.';
    }
    else if (probeParams.SNP.length < 20 || probeParams.SNP.length > 60) {
        return 'Sequence lengths must be in the range 20-60 bases.';
    }
    else if (!screenSequence(probeParams.SNP) || !screenSequence(probeParams.WT)) {
        return 'Sequences must be DNA.';
    }
    else if (probeParams.SNP.length !== probeParams.WT.length) {
        return 'Sequences must be of equal length.';
    }
    else if (probeParams.SNP === probeParams.WT) {
        return 'Sequences must be different.';
    }
    else {
        return '';
    }
};

const theme = createTheme({
    palette: {
        primary: {
          main: '#9e9e9e'
        }
    }
  });

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
        setRunning(false);
        setOutput(null);
        setFinished(false);
    };

    return (
        <div className="startstopbuttons">
            <ThemeProvider theme={theme}>
                <div className='Button'>
                    <Button className='startbutton' variant="contained" disabled={running} color="primary" onClick={HandleStart}>
                        Optimize
                    </Button>
                </div>
                <div className='Button'>
                    <Button className='stopbutton' variant="contained" disabled={!running} color="primary" onClick={HandleStop}>
                        Stop
                    </Button>
                </div>
            </ThemeProvider>
            
            {running && <Optimizer />}
        </div>
    )
};

export default Buttons;