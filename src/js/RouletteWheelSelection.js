
class RouletteWheelSelection {
	constructor( fitnessFunction ) {
		this.fitness = fitnessFunction;
	}

	/* Assertion: generation is sorted by fitness - best individuals come first */
	select(generation) {
		var sum = generation.reduce( function(a, b) {
			return 1 / this.fittness.call(a) + 1 / this.fitness.call(b);
		});

		var rnd = Math.random() * sum;
		for(let i = 0; i < generation.length; ++i) {
			sum -= 1 / this.fitness.call(generation[i]);
			if (sum < 0) return i;
		}
	}
}
