#!/bin/bash

if [[ $EUID -ne 0 ]]; then
        echo "requires root access to run ansible playbook"
        exit 1
fi

ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook --limit '!sw' -i .rvn/ansible-hosts -e 'ansible_python_interpreter=/usr/bin/python3' ansible/plays/update_all_hosts.yml

ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook --limit 'sw' -i .rvn/ansible-hosts -e 'ansible_python_interpreter=/usr/bin/python3' ansible/plays/update_all_switches.yml

