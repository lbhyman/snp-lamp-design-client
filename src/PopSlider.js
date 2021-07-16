import React from 'react';
import Slider from '@material-ui/core/Slider';
import { useState } from 'react';
import { useBetween } from 'use-between';

export const ShareablePopSizeState = () => {
    const [popSize, setPopSize] = useState(Math.log2(128));
    return {
        popSize,
        setPopSize
    }
}

function valuetext(value) {
    return `${2 ** value}`;
}

const PopSlider = () => {
    const sliderMin = 128;
    const sliderMax = 512;
    var sliderStart = 128;
    var sliderValue = sliderStart;
    const { popSize, setPopSize } = useBetween(ShareablePopSizeState);

    const handleChange = (event, newValue) => {
        setPopSize(newValue);
    };

    return (
        <div className="popslider">
            <label for="population slider" className="sliderlabel">population: {2 ** popSize}</label>
            <Slider
                defaultValue={Math.log2(sliderValue)}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                onChange={handleChange}
                step={1}
                marks
                scale={(x) => 2 ** x}
                min={Math.log2(sliderMin)}
                max={Math.log2(sliderMax)}
            />
        </div>
    );
};

export default PopSlider;