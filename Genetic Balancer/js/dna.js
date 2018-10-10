class DNA {

	constructor() {
    	this.genes = [];
    	this.geneIndex = 0;
		this.fitness = MIN_FITNESS;
    	this.dead = false;
		this.birthTime = millis();

		var totalGenes = DURATION / ACTION_PAUSE;

		for(let i = 0; i < totalGenes; i++) {
      		this.genes[i] = this.randomGene();
    	}
  	}
 
	crossover(partner) {
    	var child = new DNA();

		var maxFitness = max(this.fitness, partner.fitness);
    	var split = floor(maxFitness * (this.genes.length - 1));

    	for(let i = 0; i < this.genes.length; i++) {
      		if((i <= split && maxFitness == this.fitness)
				|| (i > split && maxFitness != this.fitness)) {
				child.genes[i] = this.genes[i];
			}else {
				child.genes[i] = partner.genes[i];
			}

      		if(random() < MUTATION_RATE) {
        		this.genes[i] = this.randomGene();
      		}
    	}

    	return child;
  	}

	calculateFitness() {
		if(this.dead) {
			return;
		}

		this.fitness = (millis() - this.birthTime) / DURATION;
		
		if(this.fitness > 1) {
			this.fitness = 1;
		}
	}

	randomGene() {
		var possible = ['L', 'R', 'X'];

		return possible[floor(random(possible.length))];
	}

	nextGene() {
		return this.genes[this.geneIndex++];
	}
}
