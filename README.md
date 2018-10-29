# <p align="center"> Music room </p>

* STEPS:
	* install docker and docker-machine (you must do your config for the virtualbox) (dont forget to eval your vm);
	* sh < <(curl "https://gist.github.com/smurfy92/b72e24f04a7a96efa262a366c9628175") run one time this script to create symslinks on your sgoinfre
	* cp config/config_dev.json config/config.json -> and add all credentials
	* docker-compose up --build

* ACCESS THE CONTAINER:
	* docker exec -it <container-id> /bin/bash

