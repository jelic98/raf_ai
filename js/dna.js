class DNA {

	constructor() {
    	this.genes = [];
    	this.geneIndex = 0;
		this.fitness = MIN_FITNESS;
    	this.dead = false;
		this.birthTime = millis();

		var totalGenes = DURATION / ACTION_PAUSE;

		for(var i = 0; i < totalGenes; i++) {
      		this.genes[i] = this.randomGene();
    	}
  	}
 
	crossover(partner) {
    	var child = new DNA();

    	var middle = floor(random(this.genes.length));

    	for(var i = 0; i < this.genes.length; i++) {
      		if(i > middle) {
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
	}

	randomGene() {
		var possible = ['L', 'R', 'X'];

		return possible[floor(random(possible.length))];
	}

	nextGene() {
		return this.genes[this.geneIndex++];
	}
}
