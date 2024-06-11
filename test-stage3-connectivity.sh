#!/bin/bash

if [[ $EUID -ne 0 ]]; then
        echo "requires root access to run ansible playbook"
        exit 1
fi

# avoid-gw0 needs to be moved from overlay - it is the CA
# and i changed the ansible role to not include it
ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook --limit '!sws,!avoid-gw0' -i .rvn/ansible-hosts -i ansible/variables/hosts.ini -e 'ansible_python_interpreter=/usr/bin/python3' -e "@ansible/variables/config.yml" ansible/plays/test_network_overlay.yml
