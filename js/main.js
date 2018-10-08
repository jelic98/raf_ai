const TOTAL_POPULATION = 4;
const MUTATION_RATE = 0.01;
const MIN_FITNESS = 0.01;

const DURATION = 5000;
const ACTION_PAUSE = 100;

const TORQUE = 1;
const FRICTION = 0;

var population;
var simulators;

function setup() {
	frameRate(1000 / ACTION_PAUSE);
	initialization();
}

function draw() {
	if(!simulationRunning()) {
		return;
	}

	selection();
	reproduction();
	simulation();
}

function initialization() {
	population = [];
	simulators = [];

	for(var i = 0; i < TOTAL_POPULATION; i++) {
    	population[i] = new DNA();
    	simulators[i] = new Simulator();
	}
}

function simulationRunning() {
	for(var i = 0; i < simulators.length; i++) {
		if(!simulators[i].finished) {
			return true;
		}
	}
	
	return false;
}

function selection() {
  	for(var i = 0; i < population.length; i++) {
    	population[i].calculateFitness();
	}
}

function reproduction() {
	for(var i = 0; i < population.length; i++) {
		var partnerA = selectPartner(population);
		var partnerB = selectPartner(population);
		
		population[i] = partnerA.crossover(partnerB);
 	}
}

function simulation() {
	for(var i = 0; i < simulators.length; i++) {
		simulators[i].simulate(population[i]);
	}
}

function selectPartner(population) {
	var emergencyExit = 0;

	while(emergencyExit < 1000) {
		var partner = population[floor(random(population.length))];
		
		if(random() < partner.fitness) {
			return partner;
		}	
	}
}
