import { useState } from 'react';
import { useBetween } from 'use-between';
import { ShareablePopSizeState } from './PopSlider.js';
import { ShareableProbeParams, ShareableStartSignal, ShareableStopSignal } from './Buttons.js';  
import NodeFetch from 'node-fetch';

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

export const ShareableGAProgressState = () => {
    const [GAProgress, setGAProgress] = useState(0);
    return {
        GAProgress,
        setGAProgress
    };    
};

export const ShareableOutputState = () => {
    const [output, setOutput] = useState();
    return {
        output,
        setOutput
    };    
};

const Optimizer = () => {

    const { probeParams } = useBetween(ShareableProbeParams);
    const { startSignal, setStartSignal } = useBetween(ShareableStartSignal);
    const { stopSignal, setStopSignal } = useBetween(ShareableStopSignal);
    const { running, setRunning } = useBetween(ShareableRunningState);
    const { setFinished } = useBetween(ShareableFinishedState);
    const { GAProgress, setGAProgress } = useBetween(ShareableGAProgressState);
    const { setOutput } = useBetween(ShareableOutputState);
    const { popSize } = useBetween(ShareablePopSizeState);
    const [probePopulation, setProbePopulation] = useState([])
    const [finalProbe, setFinalProbe] = useState()
    const endPointAddress = useState('http://127.0.0.1:5000'); // TODO: Use environment variable

    const reset = () => {
        setProbePopulation([]);
        setFinalProbe(null);
        setRunning(false);
        setFinished(false);
        setGAProgress(0);
        setOutput(null);
    };

    const generateInitialGAPopulation = () => {
        var endPoint = endPointAddress.concat('/generate_initial_population');
        var params = {
            popSize: popSize,
            probeParams: probeParams
        }
        NodeFetch(endPoint,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(params)
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            setProbePopulation(JSON.parse(json));
        })
    };

    const generateNextGAPopulation = () => {
        var endPoint = endPointAddress.concat('/generate_next_population');
        NodeFetch(endPoint,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(probePopulation)
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            setProbePopulation(JSON.parse(json));
        })
    };

    const generateNextHillClimbingSteps = () => {
        var endPoint = endPointAddress.concat('/hill_climbing_options');
        NodeFetch(endPoint,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(probePopulation)
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            setProbePopulation(JSON.parse(json));
        })
    };

    const calculateProbeFitness = (probe) => {
        var endPoint = endPointAddress.concat('/calculate_fitness');
        NodeFetch(endPoint,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(probe)
        }).then(function (response) {
            return JSON.parse(response.json());
        })
    };

    const calculatePopulationFitness = () => {
        var currPopulation = probePopulation;
        for (var i=0; i<currPopulation.length; i++) {
            if(!running) {
                reset();
                return null;
            }
            var currProbe = currPopulation[i];
            if (currProbe.beta[0] !== 0) {
                currPopulation[i] = calculateProbeFitness(currProbe);
            }
            setGAProgress(GAProgress + 1);
        }   
        setProbePopulation(currPopulation);
    };

    const getBestProbe = () => {
        var bestProbe = probePopulation[0];
        for (var i=0; i<probePopulation.length; i++) {
            var currProbe = probePopulation[i];
            if (currProbe.beta[0] > bestProbe.beta[0]) {
                bestProbe = currProbe;
            }
        }
        return bestProbe;
    };

    const runGA = () => {
        generateInitialGAPopulation();
        calculatePopulationFitness();
        while (probePopulation.length > 1) {
            generateNextGAPopulation();
            calculatePopulationFitness();
        }
        calculatePopulationFitness();
    };

    const runHillClimbing = () => {
        var bestProbe = getBestProbe();
        generateNextHillClimbingSteps();
        calculatePopulationFitness();
        var newProbe = getBestProbe();
        while (newProbe.beta[0] > bestProbe.beta[0] && probePopulation.length > 1) {
            bestProbe = newProbe;
            generateNextHillClimbingSteps();
            calculatePopulationFitness();
            newProbe = getBestProbe();
        }
        setFinalProbe(bestProbe);
    };

    const run = () => {
        reset();
        setRunning(true);
        setFinished(false);
        runGA();
        runHillClimbing();
        if (probePopulation.length > 0) {
            setFinished(true);
            setOutput(finalProbe);
        }
        setRunning(false);
    };

    if (startSignal) {
        setStartSignal(false);
        run();
    }

    if (stopSignal) {
        setStopSignal(false);
        reset();
    }

    return null;
};

export default Optimizer;