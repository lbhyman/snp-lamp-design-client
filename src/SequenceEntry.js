import { useBetween } from 'use-between';
import { useState, useReducer } from 'react';
import { ShareableProbeParams } from './Buttons.js';

const SequenceEntry = () => {

    const { probeParams, setProbeParams } = useBetween(ShareableProbeParams);
    const [WT, setWT] = useState('');
    const [SNP, setSNP] = useState('');
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const handleWT = (newValue) => {
        forceUpdate();
        var currParams = probeParams;
        currParams.WT = newValue.toUpperCase();
        setProbeParams(currParams);
        setWT(newValue);
    };
    const handleSNP = (newValue) => {
        forceUpdate();
        var currParams = probeParams;
        currParams.SNP = newValue.toUpperCase();
        setProbeParams(currParams);
        setSNP(newValue);
    };

    return (
        <div className="sequenceentry">
            <div class="seq-form" id="non-mut-form">
                <label for="non-mut">wildtype sequence</label>
                <input type="text" value={WT} id="non-mut" name="non-mut" onChange={i => handleWT(i.target.value)} />
            </div>
            <div class="seq-form" id="mut-form">
                <label for="mut">mutated sequence</label>
                <input type="text" value={SNP} id="mut" name="mut" onChange={j => handleSNP(j.target.value)} />
            </div>
        </div>
    );
};

export default SequenceEntry;