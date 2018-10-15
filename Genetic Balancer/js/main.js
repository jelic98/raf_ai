var canvasWidth;
var canvasHeight;

var population;
var simulators;
var generationCounter;
var currentMutation = MUTATION_RATE_START;
var hasError = false;

function setup() {
	if(!inputValid()) {
		hasError = true;
		return;
	}

	frameRate(1000 / ACTION_PAUSE);

	initialization();
	simulation();
}

function draw() {
	if(hasError || simulationRunning()) {
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
	updateMutation();

	var children = [];

	for(let i = 0; i < population.length; i++) {
		let partnerA = selectPartner(null);
		let partnerB = selectPartner(partnerA);
		
		children[i] = partnerA.crossover(partnerB, currentMutation);
 	}

	population = children;
}

function simulation() {
	for(let i = 0; i < simulators.length; i++) {
		simulators[i].simulate(population[i]);
	}
}

function updateMutation() {
	if(generationCounter > MUTATION_GEN_PAUSE
		&& generationCounter % MUTATION_GEN_PAUSE == 0) {
		currentMutation -= MUTATION_RATE_DELTA;

		if(currentMutation < MUTATION_RATE_END) {
			currentMutation = MUTATION_RATE_END;
		}
	}
}

function selectPartner(previous) {
	var partner = previous;
	
	while(partner === previous || partner.fitness == MIN_FITNESS) {
		partner = acceptReject();
	}
	
	return partner;
}

function acceptReject() {
	var emergencyExit = 0;

	while(emergencyExit < 1000) {
		let partner = population[floor(random(population.length))];
		
		if(random() < partner.fitness) {
			return partner;
		}	
	}
}
