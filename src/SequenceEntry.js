import { useState } from 'react';
import { useBetween } from 'use-between';

export const shareableWTState = () => {
    const [WT, setWT] = useState();
    return {
        WT,
        setWT
    }
}

export const shareableSNPState = () => {
    const [SNP, setSNP] = useState();
    return {
        SNP,
        setSNP
    }
}

const SequenceEntry = () => {

    var WT = useBetween(shareableWTState);
    var SNP = useBetween(shareableSNPState);

    const handleWT= (event, newValue) => {
        setWT(newValue);
    };
    const handleSNP= (event, newValue) => {
        setWT(newValue);
    };

    return (
        <div className="sequenceentry">
            <div class="seq-form" id="non-mut-form">
                <label for="non-mut">WT Sequence</label>
                <input type="text" value={WT} id="non-mut" name="non-mut" onChange={handleWT} />
            </div>
            <div class="seq-form" id="mut-form">
                <label for="mut">Mutated Sequence</label>
                <input type="text" value={SNP} id="mut" name="mut" onChange={handleSNP} />
            </div>
        </div>
    );
};

export default SequenceEntry;