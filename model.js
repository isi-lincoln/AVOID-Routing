/*
 * Create a version Jon's avoid routing topology in raven
 *
 * 8 gateways, connected via lan on a switch
 *
 */

topo = {
    name: "avoid_"+Math.random().toString().substr(-6),
    nodes: [
        ...["hgw0", "hgw1", "gw0", "gw1", "gw2", "gw3", "gw4", "gw5"].map(x => node(x)),
    ],
    switches: [cumulus('sw')],
    links: [
        v2v("hgw0", 1, "sw", 1, { mac: { hgw0: '04:70:00:00:01:00', sw: '04:70:00:00:01:10' } }),
        v2v("hwg1", 1, "sw", 2, { mac: { hgw1: '04:70:00:00:01:01', sw: '04:70:00:00:01:11' } }),
        v2v("gw0", 1, "sw", 3, { mac:  {  gw0: '04:70:00:00:00:00', sw: '04:70:00:00:00:10' } }),
        v2v("gw1", 1, "sw", 4, { mac:  {  gw0: '04:70:00:00:00:01', sw: '04:70:00:00:00:11' } }),
        v2v("gw2", 1, "sw", 5, { mac:  {  gw0: '04:70:00:00:00:02', sw: '04:70:00:00:00:12' } }),
        v2v("gw3", 1, "sw", 6, { mac:  {  gw0: '04:70:00:00:00:03', sw: '04:70:00:00:00:13' } }),
        v2v("gw4", 1, "sw", 7, { mac:  {  gw0: '04:70:00:00:00:04', sw: '04:70:00:00:00:14' } }),
        v2v("gw5", 1, "sw", 8, { mac:  {  gw0: '04:70:00:00:00:05', sw: '04:70:00:00:00:15' } }),
    ]
}

function node(name) {
    return {
        name: name,
        defaultnic: 'e1000',
        defaultdisktype: { dev: 'sda', bus: 'sata' },
        image: 'ubuntu-2204',
        mounts: [{ source: env.PWD, point: "/avoid" }], 
        cpu: { cores: 2, passthru:true},
        memory: { capacity: GB(8) },
    };
}

function cumulus(name) {
    return {
        name: name,
        defaultnic: 'e1000',
        image: 'cumulusvx-4.2',
        cpu: { cores: 2 },
        memory: { capacity: GB(4) },
     }
}

function v2v(a, ai, b, bi, props={}) {
    lnk = Link(a, ai, b, bi, props);
    lnk.v2v = true;
    return lnk;
}
