/*
 * Create a avoid topology to demonstrate avoid -
 *   Connect to a secure avoid gw.  If underlay is bad
 *   Connect to a new gateway.
 *
 *                          app0
 *                           |
 *                           |
 *      dns     isp 0  ------ sw0 ------ avoid-gw0 
 *       |    /  |   
 *       |   /   |            app1
 *       |  /    |             |
 * au -- sw3 -- isp 1 ------- sw1 ------ avoid-gw1
 *        \      |             |
 *         \     |             |
 *          \    |            isp3 ----- avoid-gw3
 * ue        \   |
 *            \  |
 *              isp 2 ------- sw2 ------ avoid-gw2 
 *                             |
 *                             |
 *                           app2
 *
 *
 * The UE connects to isp0,1,2.  I just cant illustrate that with my ascii art.
 */

topo = {
    name: "avoid_"+Math.random().toString().substr(-6),
    nodes: [
        ...["avoid-gw0", "avoid-gw1", "avoid-gw2", "avoid-gw3",
            "isp0", "isp1", "isp2", "isp3",
            "app0", "app1", "app2",
            "dns", "authority",
            "ue"].map(x => node(x)),
    ],
    switches: ["sw0", "sw1", "sw2", "sw3"].map(x => sw(x)),
    links: [
        v2v("ue",        1, "isp0", 1,       { mac: { "ue":        '04:70:00:00:00:00', "isp0": '04:70:00:00:00:10' } }),
        v2v("ue",        2, "isp1", 1,       { mac: { "ue":        '04:70:00:00:00:01', "isp1": '04:70:00:00:00:11' } }),
        v2v("ue",        3, "isp2", 1,       { mac: { "ue":        '04:70:00:00:00:02', "isp2": '04:70:00:00:00:12' } }),

        v2v("isp0",      2, "isp1", 2,       { mac: { "isp0":      '04:70:00:00:01:00', "isp1": '04:70:00:00:01:10' } }),
        v2v("isp1",      3, "isp2", 2,       { mac: { "isp1":      '04:70:00:00:01:01', "isp2": '04:70:00:00:01:11' } }),

        v2v("isp0",      3, "sw0", 1,        { mac: { "isp0":      '04:70:00:00:02:01',  "sw0": '04:70:00:00:02:11' } }),
        v2v("isp1",      4, "sw1", 1,        { mac: { "isp1":      '04:70:00:00:02:02',  "sw1": '04:70:00:00:02:12' } }),
        v2v("isp2",      3, "sw2", 1,        { mac: { "isp2":      '04:70:00:00:02:03',  "sw2": '04:70:00:00:02:13' } }),

        v2v("sw0",       2, "app0", 1,       { mac: { "app0":      '04:70:00:00:03:01',  "sw0": '04:70:00:00:03:11' } }),
        v2v("sw0",       3, "avoid-gw0", 1,  { mac: { "avoid-gw0": '04:70:00:00:03:02',  "sw0": '04:70:00:00:03:12' } }),

        v2v("sw1",       2, "isp3", 1,       { mac: { "isp3":      '04:70:00:00:04:01',  "sw1": '04:70:00:00:04:11' } }),
        v2v("sw1",       3, "app1", 1,       { mac: { "app1":      '04:70:00:00:04:01',  "sw1": '04:70:00:00:04:11' } }),
        v2v("sw1",       4, "avoid-gw1", 1,  { mac: { "avoid-gw1": '04:70:00:00:04:02',  "sw1": '04:70:00:00:04:12' } }),

        v2v("isp3",      2, "avoid-gw3", 1,  { mac: { "avoid-gw3": '04:70:00:00:05:01', "isp3": '04:70:00:00:04:11' } }),

        v2v("sw2",       2, "avoid-gw2", 1,  { mac: { "avoid-gw2": '04:70:00:00:06:01',  "sw2": '04:70:00:00:06:11' } }),
        v2v("sw2",       3, "app2", 1,       { mac: { "app2":      '04:70:00:00:06:02',  "sw2": '04:70:00:00:06:12' } }),

        v2v("sw3",      1, "dns",  1,        { mac: { "dns":       '04:70:00:00:07:01', "sw3": '04:70:00:00:07:11' } }),
        v2v("sw3",      1, "authority",  1,  { mac: { "authority": '04:70:00:00:07:02', "sw3": '04:70:00:00:07:12' } }),
        v2v("sw3",      2, "isp0", 4,        { mac: { "dns":       '04:70:00:00:07:03', "sw3": '04:70:00:00:07:13' } }),
        v2v("sw3",      3, "isp1", 5,        { mac: { "dns":       '04:70:00:00:07:04', "sw3": '04:70:00:00:07:14' } }),
        v2v("sw3",      4, "isp2", 4,        { mac: { "dns":       '04:70:00:00:07:05', "sw3": '04:70:00:00:07:15' } }),
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

function sw(name) {
    return {
        name: name,
        image: 'cumulusvx-4.1',
        os: 'linux',
        defaultdisktype: { 'bus': 'virtio', 'dev': 'vda' },
        cpu: { 'cores': 2 },
        memory: { 'capacity': GB(4) },
   };
}


function v2v(a, ai, b, bi, props={}) {
    lnk = Link(a, ai, b, bi, props);
    lnk.v2v = true;
    return lnk;
}
