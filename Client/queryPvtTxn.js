// // const { clientApplication } = require('./client')

// // let userClient = new clientApplication()
// // userClient.submitTxn(
// //     "trafficManagement",
// //     "trafficchannel",
// //     "traffic-contract",
// //     "TrafficManagementContract",
// //     "queryPvtTxn",
// //     "",
// //     "readViolation",
// //     "vio-01"
// // ).then(result => {
// //         // Decode the Uint8Array to a string
// //         const decodedString = new TextDecoder().decode(result);
    
// //         // Parse the string as JSON
// //         const jsonObject = JSON.parse(decodedString);
        
// //         console.log("Order details:");
// //         // Log the JSON object
// //         console.log(jsonObject);
// // });


// const { clientApplication } = require('./client');

// let userClient = new clientApplication();

// // Execute the query transaction
// userClient.queryTxn(
//     "trafficManagement",
//     "trafficchannel",
//     "traffic-contract",
//     "TrafficManagementContract",
//     "queryPvtTxn",
//     transientData,
//     "readViolation",
//     "vio-01",
// ).then(result => {
//     console.log(new TextDecoder().decode(result));
//     console.log("Traffic violation details retrieved successfully");
// }).catch(error => {
//     console.error("Error querying traffic violation:", error);
// });

// const { clientApplication } = require('./client');

// let userClient = new clientApplication();

// // Execute the query transaction without transient data
// userClient.submitTxn(
//     "trafficManagement",
//     "trafficchannel",
//     "traffic-contract",
//     "TrafficManagementContract",
//     "queryPvtTxn",  // Query function in chaincode for private data
//     "readViolation",  // Chaincode function name for reading data
//     "vio-01"  // Key to query the specific violation record
// ).then(result => {
//     const decodedString = new TextDecoder().decode(result);

//     // Parse the string as JSON if the result is JSON-encoded
//     const jsonObject = JSON.parse(decodedString);
    
//     console.log("Traffic violation details:");
//     console.log(jsonObject);
// }).catch(error => {
//     console.error("Error querying traffic violation:", error);
// });

// const { clientApplication } = require('./client');

// let userClient = new clientApplication();

// // Execute the query transaction (Ensure the correct method name is used)
// userClient.submitTxn(
//     "trafficManagement",
//     "trafficchannel",
//     "traffic-contract",
//     "TrafficManagementContract",
//     "queryPvtTxn", // Transaction function name in chaincode
//     "readViolation", // Chaincode function name for reading data
//     "vio-01" // Key to query the specific violation record
// ).then(result => {
//     // Decode the result (Uint8Array to string)
//     const decodedString = new TextDecoder().decode(result);

//     // Parse the string as JSON if the result is JSON-encoded
//     const jsonObject = JSON.parse(decodedString);

//     console.log("Traffic violation details:");
//     console.log(jsonObject);
// }).catch(error => {
//     console.error("Error querying traffic violation:", error);
// });






const { clientApplication } = require('./client')

let userClient = new clientApplication()
userClient.submitTxn(
    "trafficManagement",
    "trafficchannel",
    "traffic-contract",
    "TrafficManagementContract",
    "queryPvtTxn",
    "",
    "readViolation",
    "vio-01",
).then(result => {
            // Decode the Uint8Array to a string
            const decodedString = new TextDecoder().decode(result);
    
            // Parse the string as JSON
            const jsonObject = JSON.parse(decodedString);
            
            console.log("Violation details: ")
            // Log the JSON object
            console.log(jsonObject);
}).catch(error => {
    console.error("Error occurred", error);
});