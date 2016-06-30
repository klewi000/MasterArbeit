
class ESGenerationCreator {
	constructor( lambda, isPlus, fitnessFunction ) {
		this.lambda = lambda;
		this.isPlus = isPlus;
		this.fitness = fitnessFunction;
	}

	/* Assertion: generation is sorted by fitness - best individuals come first */
	createNextGeneration( generation ) {
		var mu = generation.length;
		
		// if plus-strategy: take over parent generation, else start with empty population
		var children = isPlus ? generation.slice() : [];

		// create lambda children
		for(let i = 0; i < this.lambda; ++i) {
			// select parent randomly (selection)
			var parent = generation[Math.floor(Math.random() * generation.length)];
			// create child (mutation)
			var child = parent.clone().mutate();
			chilren.push(child);
		}

		// sort children by fitness
		children.sort( function(a, b) {
			return this.fitness.call(a) - this.fitness.call(b);
		});

		// select mu individuums for next generation
		var nextGen = children.slice(0, mu);

		return nextGen;
	}
}

// usage example: new ESGenerationCreator( 250, Track.distance );
