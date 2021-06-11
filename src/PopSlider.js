import Slider from '@material-ui/core/Slider';
import { useState } from 'react';
import { useBetween } from 'use-between';

export const shareablePopSizeState = () => {
    const [popSize, setPopSize] = useState();
    return {
        popSize,
        setPopSize
    }
}

function valuetext(value) {
    return `${2 ** value}`;
  }

const PopSlider = () => {
    const sliderMin = 16;
    const sliderMax = 4096;
    var sliderStart = 128;
    var sliderValue = sliderStart;
    var popSize = useBetween(shareablePopSizeState);
    setPopSize(Math.log2(sliderValue));

    return (
        <div className="popslider">
            <label for="population slider" className="sliderlabel">Starting Population: {2 ** popSize}</label>
            <Slider
                defaultValue={Math.log2(sliderValue)}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                onChange={i => setPopSize(i.target.value)}
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