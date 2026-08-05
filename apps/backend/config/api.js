module.exports = ({ env }) => ({
	isCI: env.bool("CI", false),
});
