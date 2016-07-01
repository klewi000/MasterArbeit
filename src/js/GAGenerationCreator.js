
class GAGenerationCreator {
	constructor( selection, mutationRate ) {
		this.selection = selection;
		this.mutationRate = mutationRate;
	}

	/* Assertion: generation is sorted by fitness - best individuals come first */
	createNextGeneration( generation ) {
		var nextGen = [];

		// take top individuum unchanged (wildcard)
		nextGen[0] = generation[0];

		// select rest from generation array
		for(let i = 1; i < generation.length; ++i) {
			// take two individuums (selection)
			var indiv1 = this.selection.select( generation );
			var indiv2 = this.selection.select( generation );

			// mate them (crossing)
			var newIndiv = indiv1.cross(indiv2);

			// mutate them occasionally (mutation)
			if (Math.random() < this.mutationRate) {
				newIndiv.mutate();
			}

			nextGen[i] = newIndiv;
		}

		// sort children by fitness
		nextGen.sort( function(a, b) { return a.distance - b.distance });

		return nextGen;
	}
}

// usage example: new GAGenerationCreator( new TournamentSelection( 5, new BestOfSelection() ), 0.3 );
