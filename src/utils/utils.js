const fs = window.fs;
const execSync = window.execSync;

export const getFileList = (path) => {
	return fs.readdirSync(path);
};

export const readFile = (path) => {
	return fs.readFileSync(path, { encoding: 'utf-8' });
};

export function isGitReady() {
	let status;
	try {
		status = !!execSync('git --version');
	} catch(e) {
		status = false;
	}

	return status;
};
