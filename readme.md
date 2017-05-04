###**Local development setup**

Install Redis (https://redis.io/)

Clone and install project dependencies:

	git clone https://github.com/sanghin/original-content-kitty.git
	cd original-content-kitty
	npm install


Setup environment variable:

	DISCORD_TOKEN=%discordToken%
	REDIS_URL=redis://h:localhost:3679
	PORT=8000
	
	
And then :

	node server.js
