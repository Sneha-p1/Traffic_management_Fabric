const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "MVD",
    "trafficchannel",
    "traffic-contract",
    "TrafficManagementContract",
    "invokeMatch",
    "",
    "matchViolation",
    "V-01",
    "vio-01",
    "500"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("The violationExists and Fine issued")
}).catch(error => {
    console.error("Error creating vehicle:", error);

})