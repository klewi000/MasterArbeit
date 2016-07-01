
class TournamentSelection {
	constructor( tournamentSize, subSelection ) {
		this.tournamentSize = tournamentSize;
		this.subSelection = subSelection || new BestOfSelection();
	}

	/* Assertion: generation is sorted by fitness - best individuals come first */
	select(generation) {
		// create sorted list of random tournament indices, so we do not have to sort afterwards
		var randomIndices = [];
		for(let i = 0; i < this.tournamentSize; ++i) {
			randomIndices[i] = Math.floor(Math.random() * generation.length);
		}
		randomIndices.sort( function(a, b) { return a - b } );

		// look up inidividuals in generation array
		var tournament = randomIndices.map( function(idx) { return generation[idx]; } );

		// apply sub-selection to determine tournament winner
		return this.subSelection.select(tournament);
	}
}
