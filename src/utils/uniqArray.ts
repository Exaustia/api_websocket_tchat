export function uniqArray(arr: any[], index: string) {
	const uniqueIds = new Set();
	const unique = arr.filter((element) => {
		const isDuplicate = uniqueIds.has(element[index]);

		uniqueIds.add(element[index]);

		if (!isDuplicate) {
			return true;
		}

		return false;
	});
	return unique;
}
