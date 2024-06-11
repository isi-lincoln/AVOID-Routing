#!/bin/bash

set -ex

#wget -O android_requirements.yml https://raw.githubusercontent.com/ProfessorManhattan/ansible-androidstudio/c29808d28fccabf329e375a19e1131effe649557/requirements.yml

#ansible-galaxy install -r android_requirements.yml
#ansible-galaxy install professormanhattan.androidstudio

ANSIBLE_HOST_KEY_CHECKING=False ANSIBLE_ROLES_PATH=ansible/roles \
	ansible-playbook \
        -e 'ansible_python_interpreter=/usr/bin/python3' \
	-i .rvn/ansible-hosts ansible/plays/install_appium.yml
