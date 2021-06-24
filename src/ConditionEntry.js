import { useState, useReducer } from 'react';
import { useBetween } from 'use-between';
import { ShareableProbeParams } from './Buttons.js';

const ConditionEntry = () => {

    const { probeParams, setProbeParams } = useBetween(ShareableProbeParams);
    const [sodium, setSodium] = useState('');
    const [temperature, setTemperature] = useState('');
    const [magnesium, setMagnesium] = useState('');
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const handleTemperature = (newValue) => {
        forceUpdate();
        console.log(probeParams);
        console.log(probeParams.params);
        var copyParams = probeParams;
        copyParams.params.temperature = newValue;
        setProbeParams(copyParams);
        setTemperature(newValue);
    };
    const handleSodium = (newValue) => {
        forceUpdate();
        console.log(probeParams);
        console.log(probeParams.params);
        var copyParams = probeParams;
        copyParams.params.sodium = newValue;
        setProbeParams(copyParams);
        setSodium(newValue);
    };
    const handleMagnesium = (newValue) => {
        forceUpdate();
        console.log(probeParams);
        console.log(probeParams.params);
        var copyParams = probeParams;
        copyParams.params.magnesium = newValue;
        setProbeParams(copyParams);
        setMagnesium(newValue);
    };

    return (
        <div className="conditionentry">
            <div class="condition-form" id="temperature-form">
                <label for="temperature">Temperature (C)</label>
                <input type="text" value={temperature} id="temperature" name="temperature" onChange={i => handleTemperature(i.target.value)} />
            </div>
            <div class="condition-form" id="sodium-form">
                <label for="sodium">[Sodium] (mM)</label>
                <input type="text" value={sodium} id="sodium" name="sodium" onChange={j => handleSodium(j.target.value)} />
            </div>
            <div class="condition-form" id="magnesium-form">
                <label for="magnesium">[Magnesium] (mM)</label>
                <input type="text" value={magnesium} id="magnesium" name="magnesium" onChange={k => handleMagnesium(k.target.value)} />
            </div>
        </div>
    );
};

export default ConditionEntry;