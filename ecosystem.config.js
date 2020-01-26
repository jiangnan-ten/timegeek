module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [
		// First application
		{
			name: 'timegeek',
			script: './bin/www',
			env_production: {
				NODE_ENV: 'production'
			},
			max_memory_restart: '200M'
		}
	]
}
