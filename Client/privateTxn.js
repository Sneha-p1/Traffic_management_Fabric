const { clientApplication } = require('./client')

let userClient = new clientApplication();

const transientData = {
    violationId: Buffer.from("vio-01"),
    vehicleId: Buffer.from("V-01"),
    registrationNumber: Buffer.from("KL07CC1000"),
    description: Buffer.from("Over Speed")
}

userClient.submitTxn(
    "trafficManagement",
    "trafficchannel",
    "traffic-contract",
    "TrafficManagementContract",
    "privateTxn",
    transientData,
    "createTrafficViolation",
    "vio-01",
).then(result => {
    console.log(new TextDecoder().decode(result))
    console.log("Order successfully created")
})