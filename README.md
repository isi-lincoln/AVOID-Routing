# AVOID-Routing

This repo is a work in progress for implementing a secure overlay network with the capability of dictatating route selection of clients.


## Requirements

[Raven](https://pulwar.isi.edu/sabres/raven)

## Running

```
./run.sh
./modify-libvirt.sh
./stage-1.sh
./stage-2.sh
./stage-3.sh
```

### End state

This will create a topology with 2 home gateways, 6 nodes, and gw0-2 hosts connect to hgw0 and gw3-5 connect to hgw1 using wireguard.


## TODO

A way to do this without server needing peer certificates.


## Reading

[Wireguard AllowedIPs](https://try.popho.be/wg.html)
