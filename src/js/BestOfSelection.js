
class BestOfSelection {
	constructor() {
	}

	/* Assertion: generation is sorted by fitness - best individuals come first */
	select(generation) {
		return generation[0];
	}
}