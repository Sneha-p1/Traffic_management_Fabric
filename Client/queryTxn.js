const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "MVD",
    "trafficchannel",
    "traffic-contract",
    "TrafficManagementContract",
    "queryTxn",
    "",
    "readVehicle",
    "V-01",
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log("Vehicle details: ")
            // Log the JSON object
            console.log(jsonObject);
});