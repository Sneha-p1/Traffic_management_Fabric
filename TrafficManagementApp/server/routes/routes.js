const express = require("express");
const router = express.Router();
const { clientApplication } = require("./client");

const userClient = new clientApplication();


router.post("/createVehicle", async (req, res) => {
  try {
    const { vehicleId, ownerName, registrationNumber, model } = req.body;
    console.log("hgbg", req.body);

    let userClient = new clientApplication();

    const result = await userClient.submitTxn(
      "MVD",
      "trafficchannel",
      "traffic-contract",
      "TrafficManagementContract",
      "invokeTxn",
      "",
      "createVehicle",
      vehicleId,
      ownerName,
      registrationNumber,
      model
    );

      res.status(201).json({
      success: true,
      message: "Car created successfully!",
      data: { result },
      });
      console.log("successsssssssssssss");
  } catch (error) {
      console.log(error);
    res.status(500).json({
      success: false,
      message: "Please check the Car ID!",
      data: { error },
    });
  }
});

router.post("/readVehicle", async (req, res) => {
  try {
    const { vehicleId } = req.body;
    console.log(vehicleId);
    let userClient = new clientApplication();
    const result = await userClient.submitTxn(
      "MVD",
      "trafficchannel",
      "traffic-contract",
      "TrafficManagementContract",
      "queryTxn",
      "",
      "readVehicle",
      vehicleId
    );

    const decodedString = new TextDecoder().decode(result);

    // Parse the string as JSON
    const jsonObject = JSON.parse(decodedString);
  

    console.log("Vehicle Details: ");
    // Log the JSON object
    console.log(jsonObject);
    res.status(201).json({
      success: true,
      message: "Vehicle details fetched!",
      data: { jsonObject },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Please check the details!",
      data: { error },
    });
  }
});


// Delete Vehicle
router.delete("/deleteVehicle", async (req, res) => {
  const { vehicleId } = req.body;
  console.log(vehicleId);
  try {
    console.log(vehicleId);
    let userClient = new clientApplication();
    await userClient.submitTxn(
          "MVD",
          "trafficchannel",
          "traffic-contract",
          "TrafficManagementContract",
          "queryDelete",
          "",
          "deleteVehicle",
          vehicleId
      );
    //     
    res.status(200).json({ message: `Vehicle ${vehicleId} deleted successfully.` });
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        res.status(500).json({ message: `Error deleting vehicle ${vehicleId}.`, error: error.message });
    }
});


router.post("/queryAllVehicles", async (req, res) => {
  try {
    
    let vehicle = await userClient.submitTxn(
      "MVD",
      "trafficchannel",
      "traffic-contract",
      "TrafficManagementContract",
      "queryTxn",
      "",
      "queryAllVehicles"
    );
    const data = new TextDecoder().decode(vehicle);
    const value = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: "data query successfully!",
      data: { value },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please check the ID!",
      data: { error },
    });
  }
});


router.post("/readVehicleTMA", async (req, res) => {
  try {
    const { vehicleId } = req.body;
    console.log(vehicleId);
    let userClient = new clientApplication();
    const result = await userClient.submitTxn(
      "MVD",
      "trafficchannel",
      "traffic-contract",
      "TrafficManagementContract",
      "queryTxn",
      "",
      "readVehicle",
      vehicleId
    );

    const decodedString = new TextDecoder().decode(result);

    // Parse the string as JSON
    const jsonObject = JSON.parse(decodedString);
  

    console.log("Vehicle Details: ");
    // Log the JSON object
    console.log(jsonObject);
    res.status(201).json({
      success: true,
      message: "Vehicle details fetched!",
      data: { jsonObject },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Please check the details!",
      data: { error },
    });
  }
});












router.post("/createViolation", async (req, res) => {
  try {
    // Destructure the incoming request body to get violation details
    const { violationId, vehicleId, registrationNumber, description } = req.body;
    console.log("Request Body:", req.body);

    // Instantiate your client application
    let userClient = new clientApplication();

    // Set up transient data as per your Hyperledger Fabric contract
    const transientData = {
      violationId: Buffer.from(violationId),
      vehicleId: Buffer.from(vehicleId),
      registrationNumber: Buffer.from(registrationNumber),
      description: Buffer.from(description),
    };

    // Submit the transaction to the blockchain network
    const result = await userClient.submitTxn(
      "TrafficManagementMSP", // MSP ID
      "trafficchannel", // Channel name
      "traffic-contract", // Contract name
      "TrafficManagementContract", // Contract class
      "privateTxn", // Function name type for private transaction
      transientData, // Transient data object
      "createTrafficViolation", // Function name
      violationId // Violation ID
    );

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Violation created successfully!",
      data: { result },
    });
    console.log("Violation creation successful");
  } catch (error) {
    // Handle errors and send a failure response
    console.log("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating violation. Please check the inputs!",
      data: { error: error.message || error },
    });
  }
});




router.post("/createAccident", async (req, res) => {
  try {
    const { accidentId, vehicleId, registrationNumber, accidentDetails } = req.body;
    console.log("Request body:", req.body);

    let userClient = new clientApplication();

    const result = await userClient.submitTxn(
      "trafficManagement",
      "trafficchannel",
      "traffic-contract",
      "TrafficManagementContract",
      "invokeTxn",
      "",
      "createAccidentReport",
      accidentId,
      vehicleId,
      registrationNumber,
      accidentDetails
    );

    res.status(201).json({
      success: true,
      message: "Accident report created successfully!",
      data: { result },
    });
    console.log("Accident report creation successful");
  } catch (error) {
    console.error("Error creating accident report:", error);
    res.status(500).json({
      success: false,
      message: "Error creating the accident report. Please check the details!",
      data: { error },
    });
  }
});

router.post("/readAccident", async (req, res) => {
  try {
    const { accidentId } = req.body; // Extract accidentId from request body
    console.log(`Accident ID: ${accidentId}`);

    // Initialize client application instance
    let userClient = new clientApplication();

    // Submit transaction to read accident report
    const result = await userClient.submitTxn(
      "lawEnforcement",          // Organization name
      "trafficchannel",          // Channel name
      "traffic-contract",        // Chaincode name
      "TrafficManagementContract", // Contract name
      "queryLawEnforcement",     // Transaction type
      "",                        // No specific options
      "readAccidentReport",      // Function name in chaincode
      accidentId                 // Accident ID as argument
    );

    // Decode the response from Uint8Array to a string
    const decodedString = new TextDecoder().decode(result);
    const jsonObject = JSON.parse(decodedString); // Parse the string as JSON

    console.log("Accident Details:", jsonObject); // Log the accident details

    // Respond with success and accident details
    res.status(201).json({
      success: true,
      message: "Accident details fetched!",
      data: { jsonObject },
    });
  } catch (error) {
    console.error("Error reading accident report:", error); // Log any errors

    // Respond with error message
    res.status(500).json({
      success: false,
      message: "Please check the accident ID or try again later.",
      data: { error },
    });
  }
});


router.post("/giveInsurance", async (req, res) => {
  try {
    const { accidentId, registrationNumber } = req.body;
    console.log("Request body:", req.body);

    let userClient = new clientApplication();

    // Invoke the Hyperledger Fabric transaction to give insurance
    const result = await userClient.submitTxn(
      "insuranceCompany",
      "trafficchannel",
      "traffic-contract",
      "TrafficManagementContract",
      "invokeInsurance",
      "",
      "giveInsurance",
      accidentId,
      registrationNumber
    );

    res.status(201).json({
      success: true,
      message: "Insurance has been granted successfully!",
      data: { result: new TextDecoder().decode(result) }, // Decode the result
    });
    console.log("Insurance granted successfully");
  } catch (error) {
    console.error("Error granting insurance:", error);
    res.status(500).json({
      success: false,
      message: "Error granting insurance. Please check the details!",
      data: { error },
    });
  }
});


module.exports = router;
