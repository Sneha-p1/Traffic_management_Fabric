const { clientApplication } = require('./client');

let userClient = new clientApplication();
userClient.submitTxn(
    "MVD",
    "trafficchannel",
    "traffic-contract",
    "TrafficManagementContract",
    "invokeTxn",
    "",
    "createVehicle",
    "V-01",
    "Sneha",
    "KL07CC1000",
    "Car"
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Vehicle successfully created")
}).catch(error => {
    console.error("Error creating vehicle:", error);

})