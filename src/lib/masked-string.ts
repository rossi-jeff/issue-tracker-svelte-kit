export const maskedString = (
	stringToMask: string,
	leading = 0,
	trailing = 0,
	length = 15,
	char = '*'
) => {
	const prefix: string[] = stringToMask.split('').slice(0, leading);
	const suffix: string[] = trailing ? stringToMask.split('').slice(-trailing) : [];
	const middle: string[] = new Array(length - leading - trailing).fill(char);
	return [...prefix, ...middle, ...suffix].join('');
};
