/* eslint-disable func-names */
import os from 'os'

const ifaces = os.networkInterfaces()

// eslint-disable-next-line import/no-mutable-exports
let myIp = ''

Object.keys(ifaces).forEach(function(ifname) {
  let alias = 0

  ifaces[ifname].forEach(function(iface) {
    if (iface.family !== 'IPv4' || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses

      if (ifname !== 'docker0') {
        // console.log(`${ifname}:${alias}`, iface.address)
        myIp = iface.address
      }
    } else {
      // this interface has only one ipv4 adress
      // if (ifname !== 'docker0') {
      //   ifname !== 'docker0'
      // }

      // eslint-disable-next-line no-lonely-if
      if (ifname !== 'docker0') {
        // console.log(`${ifname}:${alias}`, iface.address)
        myIp = iface.address
      }
    }
    // eslint-disable-next-line no-plusplus
    ++alias
  })
})

export default myIp
