// Project: Genetic Balancer
// Author: Lazar Jelic - ljelic17@raf.rs
// Source: https://github.com/jelic98/raf_ai

const TOTAL_POPULATION = 36;
const MUTATION_RATE = 0.01;
const MIN_FITNESS = 0.01;

const DURATION = 10000;
const ACTION_PAUSE = 100;

const TORQUE = 0.1;
const FRICTION = 0;

var canvasWidth;
var canvasHeight;

var population;
var simulators;
var generationCounter;

function setup() {
	frameRate(1000 / ACTION_PAUSE);

	initialization();
	simulation();
}

function draw() {
	if(simulationRunning()) {
		return;
	}

	revision();
	selection();
	reproduction();
	simulation();
}

function initialization() {
	intializeConstants();
	
	population = [];
	simulators = [];

	for(let i = 0; i < TOTAL_POPULATION; i++) {
    	population[i] = new DNA();
    	simulators[i] = new Simulator();
	}

	generationCounter = 0;	
}

function intializeConstants() {
	var totalRows = floor(sqrt(TOTAL_POPULATION));
	var canvasRatio = 1 / totalRows;	

	canvasWidth = (window.innerWidth ||
    	document.documentElement.clientWidth ||
        document.body.clientWidth ||
        document.body.offsetWidth) * canvasRatio;

	canvasHeight = (window.innerHeight ||
    	document.documentElement.clientHeight ||
        document.body.clientHeight ||
        document.body.offsetHeight) * canvasRatio;
}

function simulationRunning() {
	for(let i = 0; i < simulators.length; i++) {
		if(!simulators[i].finished) {
			return true;
		}
	}

	return false;
}

function revision() {
	var sum = 0;
	var count = 0;

	for(let i = 0; i < population.length; i++) {
		sum += population[i].fitness;
		count++;
	}
	
	console.log("Generation #" + (++generationCounter) + " -> " + (sum / count));
}

function selection() {
  	for(let i = 0; i < population.length; i++) {
    	population[i].calculateFitness();
	}
}

function reproduction() {
	for(let i = 0; i < population.length; i++) {
		let partnerA = selectPartner(population);
		let partnerB = selectPartner(population);
		
		population[i] = partnerA.crossover(partnerB);
 	}
}

function simulation() {
	for(let i = 0; i < simulators.length; i++) {
		simulators[i].simulate(population[i]);
	}
}

function selectPartner(population) {
	var emergencyExit = 0;

	while(emergencyExit < 1000) {
		let partner = population[floor(random(population.length))];
		
		if(random() < partner.fitness) {
			return partner;
		}	
	}
}
