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
./test-stage3-connectivity.sh
./stage-4.sh
./test-stage4-connectivity.sh
./stage-5.sh
```

### End state

## Descriptions

`./run.sh` and `./modify-libvirt` create the libvirt environment and modify the links between virtual machines to limit interference by the host system.

./stage-1.sh` updates all the systems to use the latest packages, and updates the switch to put all the links on the same bridge to allow inter-connection between each host as specified in the raven topology file.

./stage-2.sh` configures the ipv4 network. The main components of this script and underlying ansible component is to provide underlay connectivity (using ipv4).  Some nodes are designated with static ips, those are defined in the `variables/config.yml` definition.  Other hosts run frr, and more specifically run the OSPF protocol to AS domains - and while not running BGP between each AS as would be normal, the notion here is that each routing domain is an AS for ease of implementation.

Additionally, there are some hosts that we treat more as ephemeral and dont require static addresses, so those hosts will get an ip address through dhcp, and use default routes through their upstream OSPF provider.

`./test-stage2-connectivity` can be run after `stage2` to validate L3 connectivity between hosts.


`./stage-3.sh` installs nebula according to definitions in `variables/config.yml` specifically the `overlay` variable.  The host `lh0` is defined as the lighthouse, `avoid-gw0` as the certificate authority. The hosts `ue`, `appX`, `avoid-gwX`, are all on the overlay with exception to `gw0` which because it is the CA is not.

`./test-stage3-connectivity` can be run after `stage3` to validate overlay connectivity between hosts.

`./stage-4.sh` installs an etcd cluster on `app1-3` and uses the overlay addresses, ensuring the cluster is run over the overlay.  It will later be used as a backend in avoid.


./stage-5.sh` installs coredns on `lh0`, replacing the dns builtin to nebula, with a modified docker container running coredns and the avoid plugin to manage dns requests over the overlay.

## Reading

[Wireguard AllowedIPs](https://try.popho.be/wg.html)
