const randomInteger = (min, max) => {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
};

export const createPhrase = () => {
	let alphabet =
			'абвгдеёжзийклмнопрстуфхцчшщъыьэюяabcdefghijklmnopqrstuvwxyz0123456789 ',
		word = '';
	let phrasesLenght = randomInteger(3, 50);
	for (let i = 0; i < phrasesLenght; i++) {
		word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
	}
	return word;
};
