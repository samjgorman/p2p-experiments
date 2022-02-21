# p2p-experiments
Experiments in peer discovery and transport for p2p. 

## mDNS
The [multicast DNS protocol](https://en.wikipedia.org/wiki/Multicast_DNS) is used to discover devices on a local network with zero-configuration over UDP. It resolves local hostnames to IP addresses without any DNS lookups. 

I built a lightweight peer discovery experiment using the [mdns module](https://www.npmjs.com/package/mdns). Host device or service discovery is supported over HTTP or HTTPS via a small CLI utility.

### Running mDNS locally

````
cd mdns
npm install
npx tsc 
cd build
node mdns.js
````

## BLE
Bluetooth Low-Energy (BLE) is a peer discovery & transport layer protocol to efficiently transmit small packets of information over a Bluetooth connection. 

I built an Electron + Bluetooth experiment that uses the [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth) to discover peers (known as BLE peripherals) that are able to connect to the requesting device.  BLE may also be used as a transport layer to exchange information, but that isn't part of this experiment as of yet.

### Running BLE locally
WIP
