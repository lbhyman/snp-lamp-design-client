
import { useState } from 'react';
import { useBetween } from 'use-between';
import NodeFetch from 'node-fetch';

export const shareableRunningState = () => {
    const [running, setRunning] = useState(false);
    return {
        running,
        setRunning
    }
}

export const shareableFinishedState = () => {
    const [finished, setFinished] = useState(false);
    return {
        finished,
        setFinished
    }
}

export const shareableGAProgressState = () => {
    const [GAProgress, setGAProgress] = useState(0);
    return {
        GAProgress,
        setGAProgress
    }    
}

export const shareableOutputState = () => {
    const [output, setOutput] = useState();
    return {
        output,
        setOutput
    }    
}

class Optimizer {

    constructor(probeParams, popSize) {
        this.probeParams = probeParams;
        this.popSize = popSize;
        this.probePopulation = [];
        this.finalProbe = null;
        this.running = useBetween(shareableRunningState);
        this.finished = useBetween(shareableFinishedState);
        this.GAProgress = useBetween(shareableGAProgressState);
        this.output = useBetween(shareableOutputState);
        this.endPointAddress = 'http://127.0.0.1:5000'; // TODO: Use environment variable
        this.reset();
    }

    reset = () => {
        this.probePopulation = [];
        setRunning(false);
        setFinished(false);
        setGAProgress(0);
        setOutput(null);
    };

    generateInitialGAPopulation = () => {
        var endPoint = this.endPointAddress.concat('/generate_initial_population');
        var params = {
            popSize: this.popSize,
            probeParams: this.probeParams
        }
        NodeFetch(endPoint,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(params)
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            this.probePopulation = JSON.parse(json);
        })
    };

    generateNextGAPopulation = () => {
        var endPoint = this.endPointAddress.concat('/generate_next_population');
        NodeFetch(endPoint,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(this.probePopulation)
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            this.probePopulation = JSON.parse(json);
        })
    };

    generateNextHillClimbingSteps = () => {
        var endPoint = this.endPointAddress.concat('/hill_climbing_options');
        NodeFetch(endPoint,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(this.probePopulation)
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            this.probePopulation = JSON.parse(json);
        })
    };

    calculateProbeFitness = (probe) => {
        var endPoint = this.endPointAddress.concat('/calculate_fitness');
        NodeFetch(endPoint,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(probe)
        }).then(function (response) {
            return JSON.parse(response.json());
        })
    };

    calculatePopulationFitness = () => {
        for (var i=0; i<this.probePopulation.length; i++) {
            if(!this.running) {
                this.reset();
                return null;
            }
            var currProbe = this.probePopulation[i];
            if (currProbe.beta[0] != 0) {
                this.probePopulation[i] = this.calculateProbeFitness(currProbe);
            }
            setGAProgress(this.GAProgress + 1);
        }    
    };

    getBestProbe = () => {
        var bestProbe = this.probePopulation[0];
        for (var i=0; i<this.probePopulation.length; i++) {
            var currProbe = this.probePopulation[i];
            if (currProbe.beta[0] > bestProbe.beta[0]) {
                bestProbe = currProbe;
            }
        }
        return bestProbe;
    };

    runGA = () => {
        this.generateInitialGAPopulation();
        this.calculatePopulationFitness();
        while (this.probePopulation.length > 1) {
            this.generateNextGAPopulation();
            this.calculatePopulationFitness();
        }
        this.calculatePopulationFitness();
    };

    runHillClimbing = () => {
        var bestProbe = this.getBestProbe();
        this.generateNextHillClimbingSteps();
        this.calculatePopulationFitness();
        var newProbe = this.getBestProbe();
        while (newProbe.beta[0] > bestProbe.beta[0] && this.probePopulation.length > 1) {
            bestProbe = newProbe;
            this.generateNextHillClimbingSteps();
            this.calculatePopulationFitness();
            var newProbe = this.getBestProbe();
        }
        this.finalProbe = bestProbe;
    };

    run = () => {
        setRunning(true);
        setFinished(false);
        this.runGA();
        this.runHillClimbing();
        if (this.probePopulation.length > 0) {
            setFinished(true);
            setOutput(this.finalProbe);
        }
        setRunning(false);
    };
}

export default Optimizer;