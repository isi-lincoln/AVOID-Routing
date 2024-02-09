# AVOID-Routing

This repo is a work in progress for implementing a secure overlay network with the capability of dictatating route selection of clients.


## Requirements

[Raven](https://pulwar.isi.edu/sabres/raven)
[Ansible](https://www.ansible.com/)

## Prerequisites

We are going to use an already create role for install an etcd cluster.

The role is from ISI's mergetb ansible repo and can be found in `requirements.yml`.

```
$ ansible-galaxy install -r requirements.yml --force
```

## Running

```
./run.sh
./modify-libvirt.sh
./stage-1.sh
./stage-2.sh
./stage-3.sh
```

### End state


## TODO

A way to do this without server needing peer certificates.


## Reading

[Wireguard AllowedIPs](https://try.popho.be/wg.html)
