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
        console.log(probeParams);
        var currParams = probeParams;
        currParams.WT = newValue;
        setProbeParams(currParams);
        setWT(newValue);
    };
    const handleSNP = (newValue) => {
        forceUpdate();
        console.log(probeParams);
        //console.log(newValue);
        var currParams = probeParams;
        currParams.SNP = newValue;
        setProbeParams(currParams);
        setSNP(newValue);
        console.log(probeParams.SNP);
    };

    return (
        <div className="sequenceentry">
            <div class="seq-form" id="non-mut-form">
                <label for="non-mut">WT Sequence</label>
                <input type="text" value={WT} id="non-mut" name="non-mut" onChange={i => handleWT(i.target.value)} />
            </div>
            <div class="seq-form" id="mut-form">
                <label for="mut">Mutated Sequence</label>
                <input type="text" value={SNP} id="mut" name="mut" onChange={j => handleSNP(j.target.value)} />
            </div>
        </div>
    );
};

export default SequenceEntry;