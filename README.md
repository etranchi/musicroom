STEP 1:
	- install docker and docker-machine (you must do your config for the virtualbox) (dont forget to eval your vm);
	- sh < <(curl "https://gist.githubusercontent.com/gcamerli/b8cf836f8627cb285f33086db10096a2/raw/8bb015464dfc8716f5fed322221fdc43b3e6ac88/docker_setup.sh")

STEP 2:
	- npm install

STEP 3:
	- docker build -t music_room .

STEP 4:
	- docker run -p 4242:4242 -v $(PWD):/usr/src/musicroom music_room

ACCESS THE CONTAINER:
	- docker exec -it <container-id> /bin/bash

