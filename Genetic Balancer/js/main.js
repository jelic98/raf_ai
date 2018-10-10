// Project: Genetic Balancer
// Author: Lazar Jelic - ljelic17@raf.rs
// Source: https://github.com/jelic98/raf_ai

const TOTAL_POPULATION = 16;
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
	var max = MIN_FITNESS;

	for(let i = 0; i < population.length; i++) {
		let currentFitness = population[i].fitness;

		if(currentFitness == 1) {
			console.log("Evolved!");
		}

		if(currentFitness > max) {
			max = currentFitness;
		}

		sum += currentFitness;
		count++;
	}
	
	console.log("Generation #"
		+ (++generationCounter)
		+ " -> "
		+ (sum / count)
		+ " ["
		+ max
		+ "]");
}

function selection() {
  	for(let i = 0; i < population.length; i++) {
    	population[i].calculateFitness();
	}
}

function reproduction() {
	var children = [];

	for(let i = 0; i < population.length; i++) {
		let partnerA = selectPartner(null, population);
		let partnerB = selectPartner(partnerA, population);
		
		children[i] = partnerA.crossover(partnerB);
 	}

	population = children;
}

function simulation() {
	for(let i = 0; i < simulators.length; i++) {
		simulators[i].simulate(population[i]);
	}
}

function selectPartner(previous, population) {
	var partner = previous;
	
	while(partner === previous || partner.fitness == MIN_FITNESS) {
		partner = acceptReject(population);
	}
	
	return partner;
}

function acceptReject(population) {
	var emergencyExit = 0;

	while(emergencyExit < 1000) {
		let partner = population[floor(random(population.length))];
		
		if(random() < partner.fitness) {
			return partner;
		}	
	}
}
