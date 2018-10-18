STEP 1:
	- install docker and docker-machine (you must do your config for the virtualbox) (dont forget to eval your vm);

STEP 2:
	- npm install

STEP 3:
	- docker build -t music_room .

STEP 4:
	- docker run -p 4242:4242 -v $(PWD):/usr/src/musicroom music_room

ACCESS THE CONTAINER:
	- docker exec -it <container-id> /bin/bash

