import React from 'react';
import { useState } from 'react';
import { useBetween } from 'use-between';

export const ShareableTemperatureState = () => {
    const [temperature, setTemperature] = useState('21');
    return {
        temperature,
        setTemperature
    }
}

export const ShareableSodiumState = () => {
    const [sodium, setSodium] = useState('65');
    return {
        sodium,
        setSodium
    }
}

export const ShareableMagnesiumState = () => {
    const [magnesium, setMagnesium] = useState('8');
    return {
        magnesium,
        setMagnesium
    }
}

const ConditionEntry = () => {

    const { setTemperature } = useBetween(ShareableTemperatureState);
    const { setSodium } = useBetween(ShareableSodiumState);
    const { setMagnesium } = useBetween(ShareableMagnesiumState);

    const handleTemperature = (event, newValue) => {
        setTemperature(newValue);
    };
    const handleSodium = (event, newValue) => {
        setSodium(newValue);
    };
    const handleMagnesium = (event, newValue) => {
        setMagnesium(newValue);
    };

    return (
        <div className="conditionentry">
            <div class="condition-form" id="temperature-form">
                <label for="temperature">Temperature (C)</label>
                <input type="text" id="temperature" name="temperature" onChange={handleTemperature} />
            </div>
            <div class="condition-form" id="sodium-form">
                <label for="sodium">[Sodium] (mM)</label>
                <input type="text" id="sodium" name="sodium" onChange={handleSodium} />
            </div>
            <div class="condition-form" id="magnesium-form">
                <label for="magnesium">[Magnesium] (mM)</label>
                <input type="text" id="magnesium" name="magnesium" onChange={handleMagnesium} />
            </div>
        </div>
    );
};

export default ConditionEntry;