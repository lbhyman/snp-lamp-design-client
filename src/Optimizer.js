import { useState } from 'react';
import NodeFetch from 'node-fetch';

class Optimizer {
    constructor(probeParams, popSize) {
        this.probeParams = probeParams;
        this.popSize = popSize;
        this.probePopulation = [];
        this.finalProbe = null;
        this.running = false; // TODO: use state hook
        this.GAProgress = 0; // TODO: use state hook
        this.endPointAddress = 'http://127.0.0.1:5000' // TODO: Use environment variable
    }

    reset() {
        this.probePopulation = [];
        this.running = false;
        this.GAProgress = 0;
    }

    generateInitialGAPopulation() {
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
    }

    generateNextGAPopulation() {
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
    }

    generateNextHillClimbingSteps() {
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
    }

    calculateProbeFitness(probe) {
        var endPoint = this.endPointAddress.concat('/calculate_fitness');
        NodeFetch(endPoint,
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(probe)
        }).then(function (response) {
            return JSON.parse(response.json());
        })
    }

    calculatePopulationFitness() {
        for (var i=0; i<this.probePopulation.length; i++) {
            if(!this.running) {
                this.reset();
                return null;
            }
            var currProbe = this.probePopulation[i];
            this.probePopulation[i] = this.calculateProbeFitness(currProbe);
            this.GAProgress ++;
        }    
    }

    getBestProbe() {
        var bestProbe = this.probePopulation[0];
        for (var i=0; i<this.probePopulation.length; i++) {
            var currProbe = this.probePopulation[i];
            if (currProbe.beta[0] > bestProbe.beta[0]) {
                bestProbe = currProbe;
            }
        }
        return bestProbe;
    }

    runGA() {
        this.generateInitialGAPopulation();
        this.calculatePopulationFitness();
        while (this.probePopulation.length > 1) {
            this.generateNextGAPopulation();
            this.calculatePopulationFitness();
        }
        this.calculatePopulationFitness();
    }

    runHillClimbing() {
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
    }

    run() {
        this.runGA();
        this.runHillClimbing();
    }
}