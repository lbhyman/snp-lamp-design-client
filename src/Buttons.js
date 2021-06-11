import { shareableRunningState } from './Optimizer.js';
import { shareableTemperatureState, shareableSodiumState, shareableMagnesiumState } from './ConditionEntry.js';
import { shareablePopSizeState } from './PopSlider.js';
import { shareableWTState, shareableSNPState } from './SequenceEntry.js';
import Optimizer from './Optimizer.js';
import Button from '@material-ui/core/Button';
import { useBetween } from 'use-between';

const Buttons = () => {

    var running = useBetween(shareableRunningState);
    var temperature = useBetween(shareableTemperatureState);
    var sodium = useBetween(shareableSodiumState);
    var magnesium = useBetween(shareableMagnesiumState);
    var popSize = useBetween(shareablePopSizeState);
    var WT_seq = useBetween(shareableWTState);
    var SNP_seq = useBetween(shareableSNPState);
    var optimizer;
    var probe_params = {
        WT:WT_seq,
        SNP:SNP_seq,
        minlength:6,
        mut_rate:0.5,
        concentrations:{non_mut_target:1e-7, mut_target:1e-7, probeF:1e-7, probeQ:1e-7, sink:1e-7, sinkC:1e-7},
        params:{temperature:parseFloat(temperature), sodium:parseFloat(sodium)/1000.0, magnesium:parseFloat(magnesium)/1000.0},
        beta:[0,0,0,0],
        truncations:[]
    };

    const handleStart = (event, newValue) => {
        optimizer = Optimizer(probe_params, popSize);
        setRunning(true);
        optimizer.run();
    };
    const handleStop = (event, newValue) => {
        setRunning(false);
        optimizer.reset();
    };

    return (
        <div className="startstopbuttons">
            <Button className='startbutton' variant="contained" disabled={running} color="primary" onClick={handleStart}>
                Optimize
            </Button>
            <Button className='stopbutton' variant="contained" disabled={!running} color="default" onClick={handleStop}>
                Stop
            </Button>
        </div>
    );
};

export default Buttons;