const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "lawEnforcement",
    "trafficchannel",
    "traffic-contract",
    "TrafficManagementContract",
    "queryLawEnforcement",
    "",
    "readAccidentReport",
    "A-01",
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log("The accident is happend with this accident Id")
            // Log the JSON object
            console.log(jsonObject);
});