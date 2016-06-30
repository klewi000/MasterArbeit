
class RouletteWheelSelection {
	constructor( ) {
	}

	/* Assertion: generation is sorted by fitness - best individuals come first */
	select(generation) {
		var invDists = generation.map( function(a) { return 1 / a.distance } );
		var sum = invDists.reduce( function(a, b) { return a + b });

		var rnd = Math.random() * sum;
		for(let i = 0; i < invDists.length; ++i) {
			rnd -= invDists[i];
			if (rnd < 0) return generation[i];
		}

		// fallback
		return generation[generation.length - 1];
	}
}
