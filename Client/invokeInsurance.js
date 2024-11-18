const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "insuranceCompany",
    "trafficchannel",
    "traffic-contract",
    "TrafficManagementContract",
    "invokeInsurance",
    "",
    "giveInsurance",
    "A-01",
    "KL07CC1000"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Insurance has been granted for the vehicle")
}).catch(error => {
    console.error("Error creating vehicle:", error);

})