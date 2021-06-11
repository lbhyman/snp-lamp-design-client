import { shareableRunningState, shareableFinishedState, shareableGAProgressState, shareableOutputState } from './Optimizer.js'
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { useBetween } from 'use-between';
function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={130}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <label for='progress label' className='proglabel'>{props.value}%</label>
            </Box>
        </Box>
    );
}
CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

const Output = () => {
    var running = useBetween(shareableRunningState)
    var finished = useBetween(shareableFinishedState)
    var progress = useBetween(shareableGAProgressState)
    var output = useBetween(shareableOutputState)

    if (running) {
        return (
            <div className="progress">
                <h2>Optimization in Progress...</h2>
                <CircularProgressWithLabel variant="determinate" size='150px' value={progress} className="progressbar" />
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