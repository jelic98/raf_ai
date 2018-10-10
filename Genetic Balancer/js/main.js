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

function inputValid() {
	if(TOTAL_POPULATION <= 1) {
		console.error("Population must have multiple members. Change TOTAL_POPULATION!");

		if(TOTAL_POPULATION < 0) {
			console.error("Number of members in population has to be positive number.");
		}

		return false;
	}

	if(DURATION <= 0) {
		console.error("Evolution target duration must be positive number. Change DURATION!");
	
		return false;
	}

	if(ACTION_PAUSE < 17) {
		console.error("Maximum frame rate (60 fps) exceeded. Change ACTION_PAUSE!");
	
		if(ACTION_PAUSE < 0) {
			console.error("Pause between action has to be positive number.");
		}

		return false;
	}

	if(MIN_FITNESS <= 0) {
		console.error("Minimum fitness value must be positive number. Change MIN_FITNESS!");
	
		return false;
	}

	if(MUTATION_RATE_START < 0) {
		console.error("Mutation starting value must be positive number. Change MUTATION_RATE_START!");
	
		return false;
	}

	if(MUTATION_RATE_END < 0) {
		console.error("Mutation ending value must be positive number. Change MUTATION_RATE_END!");
	
		return false;
	}

	if(MUTATION_RATE_START < MUTATION_RATE_END) {
		console.error("Mutation starting value must be greater than or equal to ending value. Change MUTATION_RATE_START or MUTATION_RATE_END!");
	
		return false;
	}

	if(MUTATION_RATE_DELTA < 0) {
		console.error("Mutation step size must be positive number. Change MUTATION_RATE_DELTA!");
	
		return false;
	}

	if(MUTATION_GEN_PAUSE < 0) {
		console.error("Mutation pause must be positive number. Change MUTATION_GEN_PAUSE!");
	
		return false;
	}
		
	return true;
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

function updateMutation() {
	if(generationCounter > MUTATION_GEN_PAUSE
		&& generationCounter % MUTATION_GEN_PAUSE == 0) {
		currentMutation -= MUTATION_RATE_DELTA;

		if(currentMutation < MUTATION_RATE_END) {
			currentMutation = MUTATION_RATE_END;
		}
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
