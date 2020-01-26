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
			env_local: {
				FILE_PATH: '/Users/ten/Downloads'
			},
			env_prod: {
				FILE_PATH: '/home/ubuntu/www/project/timegeek-data'
			},
			max_memory_restart: '300M'
		}
	]
}
