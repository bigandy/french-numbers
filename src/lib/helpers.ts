export function createNumbersObject(min: number, max: number) {
	// array of numbers from min to max
	const maxValue = Math.max(min, max);

	const minValue = Math.min(min, max);
	const diff = maxValue - minValue;

	const arrayOutput = Array(diff + 1)
		.fill("")
		.map((_, i) => i + min);
	const outputObj = {}
	for(const item of arrayOutput) {
        // @ts-expect-error
		outputObj[item] = {
			status: 'undefined'
		}
	}

	// console.log({ maxValue, minValue, diff, arrayOutput, outputObj });
	
	return outputObj;
};
