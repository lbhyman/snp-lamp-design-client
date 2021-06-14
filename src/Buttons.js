import { ShareableRunningState } from './Optimizer.js';
import { ShareableTemperatureState, ShareableSodiumState, ShareableMagnesiumState } from './ConditionEntry.js';
import { ShareableWTState, ShareableSNPState } from './SequenceEntry.js';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { useBetween } from 'use-between';

export const ShareableProbeParams = () => {
    const [probeParams, setProbeParams] = useState(null);
    return {
        probeParams,
        setProbeParams
    };
};

export const ShareableStartSignal = () => {
    const [startSignal, setStartSignal] = useState(false);
    return {
        startSignal,
        setStartSignal
    };
};

export const ShareableStopSignal = () => {
    const [stopSignal, setStopSignal] = useState(false);
    return {
        stopSignal,
        setStopSignal
    };
};

const Buttons = () => {

    const { running, setRunning } = useBetween(ShareableRunningState);
    const { temperature } = useBetween(ShareableTemperatureState);
    const { sodium } = useBetween(ShareableSodiumState);
    const { magnesium } = useBetween(ShareableMagnesiumState);
    const { WT_seq } = useBetween(ShareableWTState);
    const { SNP_seq } = useBetween(ShareableSNPState);
    const { setProbeParams } = useBetween(ShareableProbeParams);
    const { setStartSignal } = useBetween(ShareableStartSignal);
    const { setStopSignal } = useBetween(ShareableStopSignal);

    const HandleStart = (value, newValue) => {
        var params = {
            WT:WT_seq,
            SNP:SNP_seq,
            minlength:6,
            mut_rate:0.5,
            concentrations:{non_mut_target:1e-7, mut_target:1e-7, probeF:1e-7, probeQ:1e-7, sink:1e-7, sinkC:1e-7},
            params:{temperature:parseFloat(temperature), sodium:parseFloat(sodium)/1000.0, magnesium:parseFloat(magnesium)/1000.0},
            beta:[0,0,0,0],
            truncations:[]
        };
        setProbeParams(params);
        setStartSignal(true);
    };

    const HandleStop = (value, newValue) => {
        setRunning(false);
        setStopSignal(true);
    };

    return (
        <div className="startstopbuttons">
            <Button className='startbutton' variant="contained" disabled={running} color="primary" onClick={HandleStart}>
                Optimize
            </Button>
            <Button className='stopbutton' variant="contained" disabled={!running} color="default" onClick={HandleStop}>
                Stop
            </Button>
        </div>
    )
};

export default Buttons;