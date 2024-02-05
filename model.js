/*
 * Create a avoid topology to demonstrate avoid -
 *   Connect to a secure avoid gw.  If underlay is bad
 *   Connect to a new gateway.
 *
 *      isp 0 ---- avoid-gw0 --- app0
 *     /               |--- DNS (over https)
 *    /
 *   / 
 * UE - isp 1 ---- avoid-gw1 --- app1
 *  \                  |--- load balancer
 *   \                 |--- DNS (over https)
 *    \
 *      isp 2 ---- avoid-gw2 --- app2
 *                     |--- DNS (over https)
 *
 */

topo = {
    name: "avoid_"+Math.random().toString().substr(-6),
    nodes: [
        ...["avoid-gw0", "avoid-gw1", "avoid-gw2", "isp0", "isp1", "isp2", "app0", "app1", "app2", "ue"].map(x => node(x)),
    ],
    switches: [],
    links: [
        v2v("ue",        1, "isp0", 1,       { mac: { "ue":        '04:70:00:00:00:00', "isp0": '04:70:00:00:00:10' } }),
        v2v("ue",        2, "isp1", 1,       { mac: { "ue":        '04:70:00:00:00:01', "isp1": '04:70:00:00:00:11' } }),
        v2v("ue",        3, "isp2", 1,       { mac: { "ue":        '04:70:00:00:00:02', "isp2": '04:70:00:00:00:12' } }),

        v2v("isp0",      2, "avoid-gw0", 1,  { mac: { "avoid-gw0": '04:70:00:00:01:00', "isp0": '04:70:00:00:01:10' } }),
        v2v("isp1",      2, "avoid-gw1", 1,  { mac: { "avoid-gw1": '04:70:00:00:01:01', "isp1": '04:70:00:00:01:11' } }),
        v2v("isp2",      2, "avoid-gw2", 1,  { mac: { "avoid-gw2": '04:70:00:00:01:02', "isp2": '04:70:00:00:01:12' } }),

        v2v("avoid-gw0", 2, "app0", 1,       { mac: { "avoid-gw0": '04:70:00:00:02:00', "app0": '04:70:00:00:02:10' } }),
        v2v("avoid-gw1", 2, "app1", 1,       { mac: { "avoid-gw1": '04:70:00:00:02:01', "app1": '04:70:00:00:02:11' } }),
        v2v("avoid-gw2", 2, "app2", 1,       { mac: { "avoid-gw1": '04:70:00:00:02:02', "app2": '04:70:00:00:02:12' } }),
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

function v2v(a, ai, b, bi, props={}) {
    lnk = Link(a, ai, b, bi, props);
    lnk.v2v = true;
    return lnk;
}
