# Music room

1. STEPS:
	1. install docker and docker-machine (you must do your config for the virtualbox) (dont forget to eval your vm);
	1. sh < <(curl "https://gist.github.com/smurfy92/b72e24f04a7a96efa262a366c9628175") run one time this script to create symslinks on your sgoinfre
	1. cp config/config_dev.json config/config.json -> and add all credentials
	1. docker-compose up --build

1. ACCESS THE CONTAINER:
	1. docker exec -it <container-id> /bin/bash

