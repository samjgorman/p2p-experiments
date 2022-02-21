/**
 *  This file is an experiment in advertising and discovering
 *  available devices and services on a local network with mDNS.
 */

const mdns = require("mdns");
var inquirer = require("inquirer");

/**
 * advertiseHost advertises a http or https server on a specified port to be discoverable, in this case
 * the arbitrary port 4321.
 * @param protocol https or http
 */
function advertiseHost(protocol: string) {
  const ad = mdns.createAdvertisement(mdns.tcp(protocol), 4321);
  ad.start();
}

/**
 * discoverHosts makes the device invoking the function discoverable, then
 * listens for discovered host devices over mDNS.
 * @param protocol
 */
function discoverHosts(protocol: string) {
  advertiseHost(protocol); // watch all http servers
  const browser = mdns.createBrowser(mdns.tcp(protocol));

  //A matching service appeared
  browser.on("serviceUp", (service) => {
    var name = service.name;
    console.log("Discovered device name: ", name);
  });

  //A matching service disappeared
  browser.on("serviceDown", (service) => {
    console.log("service down: ", service.name);
  });

  //There was an error
  browser.on("error", (exception) => {
    console.log("error", exception);
  });

  browser.start();
}

/**
 * discoverServices
 * listens for discovered host services over mDNS.
 * @param protocol
 */
function discoverServices() {
  const all_the_types = mdns.browseThemAll();

  all_the_types.on("serviceUp", (service) => {
    var resolved = mdns.resolve(service, (err, found_service) => {
      console.log(found_service);
    });
  });

  all_the_types.start();
}

/**
 * discoverDriver is a function that accepts user input in the form of
 * specifying a protocol, then discovers available local hosts and services
 * via mDNS.
 * @param protocol
 */
function discoverDriver() {
  const service = inquirer
    .prompt([
      {
        /* Pass your questions in here */
        type: "list",
        name: "protocol",
        message: "What service would you like to use for MDNS discovery?",
        choices: ["http", "https"],
      },
    ])
    .then((answer) => {
      console.log("Discoverable hosts :  ");
      discoverHosts(answer.protocol);
      console.log("Discoverable services:  ");
      // discoverServices(); //WIP
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log("Prompt couldn't be rendered in the current environment");
      } else {
        // Something else went wrong
        console.log("There's been an error:  ", error);
      }
    });
}

discoverDriver();
