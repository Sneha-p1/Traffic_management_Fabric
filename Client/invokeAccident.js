const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "trafficManagement",
    "trafficchannel",
    "traffic-contract",
    "TrafficManagementContract",
    "invokeAccident",
    "",
    "createAccidentReport",
    "A-01",
    "V-01",
    "KL07CC1000",
    "car crash"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Accident is Reported")
}).catch(error => {
    console.error("Error creating vehicle:", error);

})