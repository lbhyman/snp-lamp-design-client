import { useState, useEffect, useReducer } from 'react';
import { LoaderDots } from '@thumbtack/thumbprint-react';
import { useBetween } from 'use-between';

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

const centerPadOutput = (out, curr_seq, curr_label) => {
    var curr_output = [out['probeF'], out['probeQ'], out['sink'], out['sinkC']];
    var longest = Math.max(...(curr_output.map(el => el.length)));
    var padLength = 70  - (9 + longest);
    var padLeft = Math.round(padLength / 2);
    var padRight = 70 - (curr_seq.length + 9 + padLeft);
    var result = curr_label.concat(curr_seq);
    for (let i=0; i<padLeft; i++) {
        result = ' '.concat(result);
    }
    for (let i=0; i<padRight; i++) {
        result = result.concat(' ');
    }
    return result;
}

const Output = () => {
    const { running } = useBetween(ShareableRunningState)
    const { finished } = useBetween(ShareableFinishedState)
    const { output } = useBetween(ShareableOutputState)
    const { warning } = useBetween(ShareableWarningState)
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        forceUpdate();
    }, [running, finished, output, warning]);

    if (warning !== '') {
        return (
            <div className="output">
                <h3 className="warningheader">unable to optimize:</h3>
                <p className="warningtext">{ warning }</p>
            </div>
        )
    }
    else if (running) {
        return (
            <div className="output">
                <h3 className="proglabel">optimizing</h3>
                <LoaderDots size="medium" className="progindicator" />
            </div>
        );
    }
    else if (finished) {
        console.log(output);
        return (
            <div className="output">
                <div className="seq_output" style={{ dislay: 'flex', alignItems: 'center', whiteSpace: 'pre-wrap', color: '#e0e0e0' }}>
                    {`

${centerPadOutput(output, output['probeF'], 'ProbeF:  ')}

${centerPadOutput(output, output['probeQ'], 'ProbeQ:  ')}

${centerPadOutput(output, output['sink'],   'Sink:    ')}

${centerPadOutput(output, output['sinkC'],  'Sink*:   ')}
                    `}
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="emptyoutput">
            </div>
        );
    }

};

export default Output;