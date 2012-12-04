import resources.configs.global as config;

exports = {
	x: config.width / 5,
	y: config.height / 5,
	row: 72
};

exports.width = config.width - (exports.x * 2);
exports.height = (exports.row * 5) + (exports.row / 1.5);