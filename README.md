# AVOID-Routing

This repo is a work in progress for implementing a secure overlay network with the capability of dictatating route selection of clients.


## Requirements

[Raven](https://pulwar.isi.edu/sabres/raven)
[Ansible](https://www.ansible.com/)

## Prerequisites

We need to pull our etcd role submodule for ansible.  Required for `stage-4.sh`.

```
$ git submodule update --init --recursive
```

## Running

```
./run.sh
./modify-libvirt.sh
./stage-1.sh
./stage-2.sh
./stage-3.sh
./stage-4.sh
```

### End state


## TODO

A way to do this without server needing peer certificates.


## Reading

[Wireguard AllowedIPs](https://try.popho.be/wg.html)
