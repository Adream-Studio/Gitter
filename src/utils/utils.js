const fs = window.fs;

export const getFileList = (path) => {
	return fs.readdirSync(path);
};

export const readFile = (path) => {
	return fs.readFileSync(path, { encoding: 'utf-8' });
};
