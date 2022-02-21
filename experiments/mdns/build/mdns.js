const mdns = require("mdns");
var inquirer = require("inquirer");
function advertiseHost(protocol) {
    const ad = mdns.createAdvertisement(mdns.tcp(protocol), 4321);
    ad.start();
}
function discoverHosts(protocol) {
    advertiseHost(protocol);
    const browser = mdns.createBrowser(mdns.tcp(protocol));
    browser.on("serviceUp", (service) => {
        var name = service.name;
        console.log("Discovered device name: ", name);
    });
    browser.on("serviceDown", (service) => {
        console.log("service down: ", service.name);
    });
    browser.on("error", (exception) => {
        console.log("error", exception);
    });
    browser.start();
}
function discoverServices() {
    const all_the_types = mdns.browseThemAll();
    all_the_types.on("serviceUp", (service) => {
        var resolved = mdns.resolve(service, (err, found_service) => {
            console.log(found_service);
        });
    });
    all_the_types.start();
}
function discoverDriver() {
    const service = inquirer
        .prompt([
        {
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
    })
        .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        }
        else {
            console.log("There's been an error:  ", error);
        }
    });
}
discoverDriver();
//# sourceMappingURL=mdns.js.map