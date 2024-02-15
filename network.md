# Network Topology

```
                            app0
                             |
                             |
      dns     isp 0  ------ sw0 ------ avoid-gw0 
       |    /  |   
       |   /   |            app1
       |  /    |             |
 au -- sw3 -- isp 1 ------- sw1 ------ avoid-gw1
        \      |             |
         \     |             |
          \    |            isp3 ----- avoid-gw3
 ue        \   |
            \  |
              isp 2 ------- sw2 ------ avoid-gw2 
                             |
                             |
                            app2

```

## Networks

### Switch 3 (DNS): 10.10.0.0/24

 * authority: 10.10.0.10
 * dns: 10.10.0.11
 * isp0: 10.10.0.100
 * isp1: 10.10.0.101
 * isp2: 10.10.0.102

A note since this is our DNS service, we need to have dnsmasq or whatever service
is deliverying the dhcp requests to have dhcp-options 6 enabled and pointing to
10.10.0.11.

Authority will be the authorative nameserver for avoid.org and therefore we will
need to have a NS record on the dns server.

### Switch 0 (ISP0) 10.10.10.0/24

ISP0 will have a dhcp network for sw0 such that app0 and avoid-gw0 can pick up an
ip address, default gateway will be isp0 in order to limit distriburing OSPF routes.

### Switch 1 (ISP1) 10.10.11.0/24

The same as with isp0, no difference even with isp3.  ISP1 will act as area 0 backbone
of the OSPF network.  Each OSPF speaker is directly connect to ISP1 and therefore can
participate in the OSPF routing.

### Switch 2 (ISP2) 10.10.12.0/24

Same as Switch 0.

### Switch 3 (ISP3) 10.10.13.0/24

Switch 3 will also participate in the OSPF network even though it connects into
ISP1's subnet.  Instead of having a DHCP address from ISP1, it will have a
statically allocated address outside dhcp range.

### UE

 * ISP0: 10.0.0.0/24
 * ISP1: 10.0.1.0/24
 * ISP2: 10.0.2.0/24

### ISP0 - ISP1

 * 10.0.10.10, 10.0.10.11

### ISP1 - ISP2

 * 10.0.11.10, 10.0.11.12


### Wireguard network

 * gw0: 192.168.0.10
 * gw1: 192.168.0.11
 * gw2: 192.168.0.12
 * gw3: 192.168.0.13
 * app0: 192.168.0.100
 * app1: 192.168.0.101
 * app2: 192.168.0.102
 * ue: 192.168.0.99
