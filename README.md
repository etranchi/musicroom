STEP 1:
	- install docker and docker-machine (you must do your config for the virtualbox) (dont forget to eval your vm);
	- sh < <(curl "https://gist.githubusercontent.com/gcamerli/b8cf836f8627cb285f33086db10096a2/raw/8bb015464dfc8716f5fed322221fdc43b3e6ac88/docker_setup.sh")
	- cp config/config_dev.json config/config.json -> and add all credentials

STEP 2:
	- docker-compose up --build

ACCESS THE CONTAINER:
	- docker exec -it <container-id> /bin/bash

