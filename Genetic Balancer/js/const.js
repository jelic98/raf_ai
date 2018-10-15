// Project: Genetic Balancer
// Author: Lazar Jelic - ljelic17@raf.rs
// Source: https://github.com/jelic98/raf_ai

const TOTAL_POPULATION = 16; // Number of members in single population
const DURATION = 10000; // Evolution target duration in milliseconds
const ACTION_PAUSE = 100; // Pause between reading genes (and then taking action) in milliseconds
const MIN_FITNESS = 0.01; // Minimum fitness allowed (added to prevent division by zero in some cases)

const MUTATION_RATE_START = 0.1; // Starting mutation rate value (must be greater than ending value)
const MUTATION_RATE_END = 0.01; // Ending mutaion rate value (must be greater than starting value)
const MUTATION_RATE_DELTA = 0.02; // Step size from starting to ending mutation value
const MUTATION_GEN_PAUSE = 5; // Number of generations that need to live before decreasing mutation rate

const TORQUE = 0.1; // Force at which after reading signle gene
const FRICTION = 0; // Friction between balancing bodies

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
