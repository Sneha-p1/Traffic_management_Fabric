/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

async function getCollectionName(ctx) {
    const collectionName = 'ViolationCollection';
    return collectionName;
}

class TrafficManagementContract    extends Contract {

    async vehicleExists(ctx, vehicleId) {
        const buffer = await ctx.stub.getState(vehicleId);
        return (!!buffer && buffer.length > 0);
    }

    async registrationExists(ctx, registrationNumber) {
        const buffer = await ctx.stub.getState(registrationNumber);
        return (!!buffer && buffer.length > 0);
    }

    async violationExists(ctx, violationId) {
        const collectionName = await getCollectionName(ctx);
        const data = await ctx.stub.getPrivateDataHash(collectionName, violationId);
        return (!!data && data.length > 0);
    }

    // async accidentExists(ctx, accidentId) {
    //     const collectionName = await getCollectionName(ctx);
    //     const data = await ctx.stub.getPrivateDataHash(collectionName, accidentId);
    //     return (!!data && data.length > 0);
    // }

    
    async accidentExists(ctx, accidentId) {
        const buffer = await ctx.stub.getState(accidentId);
        return !!buffer && buffer.length > 0;
    }
    


    
async createVehicle(ctx, vehicleId, ownerName, registrationNumber, model) {
    const mspID = ctx.clientIdentity.getMSPID();
    if (mspID === 'MVDMSP') {
        // Check if vehicleId is unique
        const vehicleExists = await this.vehicleExists(ctx, vehicleId);
        if (vehicleExists) {
            throw new Error(`The vehicle with ID ${vehicleId} already exists`);
        }

        // Check if registrationNumber is unique
        const registrationExists = await this.registrationExists(ctx, registrationNumber);
        if (registrationExists) {
            throw new Error(`The registration number ${registrationNumber} already exists`);
        }

        // If both are unique, proceed with creation
        const vehicleDetails = {
            vehicleId,
            ownerName,
            registrationNumber,
            model,
            status: 'Registered',
            assetType: 'VehicleDetails'
        };
        const buffer = Buffer.from(JSON.stringify(vehicleDetails));
        await ctx.stub.putState(vehicleId, buffer);
    } else {
        return `User under MSP: ${mspID} cannot perform this action`;
    }
}

// Helper function to check if registration number already exists
async registrationNumberExists(ctx, registrationNumber) {
    const queryString = {
        selector: {
            registrationNumber: registrationNumber,
            assetType: 'VehicleDetails'
        }
    };
    const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    const result = await iterator.next();
    return !result.done; // If not done, it means a record was found
}



async readVehicle(ctx, vehicleId) {
    const exists = await this.vehicleExists(ctx, vehicleId);
    if (!exists) {
        throw new Error(`The vehicle ${vehicleId} does not exist`);
    }
    const buffer = await ctx.stub.getState(vehicleId);
    return JSON.parse(buffer.toString());
  
}

    
    async deleteVehicle(ctx, vehicleId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'MVDMSP') {
            const exists = await this.vehicleExists(ctx, vehicleId);
            if (!exists) {
                throw new Error(`The vehicle ${vehicleId} does not exist`);
            }
            await ctx.stub.deleteState(vehicleId);
        } else {
            return `Organization with MSP ID ${mspID} cannot perform this action`;
        }
    }
    


    // TMA creates a traffic violation Details
    async createTrafficViolation(ctx, violationId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'TrafficManagementMSP') {
            // Check if violationId is unique
            const exists = await this.violationExists(ctx, violationId);
            if (exists) {
                throw new Error(`The violation ${violationId} already exists`);
            }
    
            // Get transient data
            const transientData = ctx.stub.getTransient();
            if (transientData.size === 0 || !transientData.has('violationId')
                || !transientData.has('vehicleId') || !transientData.has('registrationNumber')
                || !transientData.has('description')
            ) {
                throw new Error('The expected key was not specified in transient data. Please try again.');
            }
    
            // Extract vehicleId from transient data and check if it exists
            const vehicleId = transientData.get('vehicleId').toString();
            const vehicleExists = await this.vehicleExists(ctx, vehicleId);
            if (!vehicleExists) {
                throw new Error(`Cannot create violation. Vehicle with ID ${vehicleId} does not exist`);
            }
    
            // Fetch vehicle details and check if it was created by MVD
            const vehicleData = await ctx.stub.getState(vehicleId);
            const vehicle = JSON.parse(vehicleData.toString());
            if (vehicle.assetType !== 'VehicleDetails') {
                throw new Error(`Invalid asset type for vehicle ${vehicleId}`);
            }
    
            // Populate violation details and store in private data collection
            const violation = {
                violationId: transientData.get('violationId').toString(),
                vehicleId,
                registrationNumber: transientData.get('registrationNumber').toString(),
                description: transientData.get('description').toString(),
                assetType: 'violation'
            };
    
            const collectionName = await getCollectionName(ctx);
            await ctx.stub.putPrivateData(collectionName, violationId, Buffer.from(JSON.stringify(violation)));
        } else {
            return `Organisation with mspid ${mspID} cannot perform this action`;
        }
    }
    

    async readViolation(ctx, violationId) {
        const exists = await this.violationExists(ctx, violationId);
        if (!exists) {
            throw new Error(`The Vehicle with ID ${violationId} does not exist`);
        }

        
        const collectionName = await getCollectionName(ctx);
        const data = await ctx.stub.getPrivateData(collectionName, violationId);
        
        if (!data || data.length === 0) {
            throw new Error(`The violation with ID ${violationId} does not exist`);
        }
    
        const dataString = JSON.parse(data.toString());
        return dataString;
    }

     

// MVD issues fine based on TMA's violation, then matches it with available products
async matchViolation(ctx, vehicleId, violationId, fineamount, ) {
    const mspID = ctx.clientIdentity.getMSPID();
if (mspID !== 'MVDMSP') {
    return `Organization with MSP ID ${mspID} cannot perform this action.`;
}

    const vehicleExists = await this.vehicleExists(ctx, vehicleId);
    if (!vehicleExists) {
        throw new Error(`The vehicleExists ${vehicleId} does not exist`);
    }

    const violationExists = await this.violationExists(ctx, violationId);
    if (!violationExists) {
        throw new Error(`The violationExists ${violationId} does not exist`);
    }

    const vehicleDetails = await this.readVehicle(ctx, vehicleId);
    const violationDetails = await this.readViolation(ctx, violationId);

    // Matching criteria based on vehicle vehicleId and registrationNumber
    if (vehicleDetails.vehicleId === violationDetails.vehicleId && vehicleDetails.registrationNumber <= violationDetails.registrationNumber) {
           violationDetails.status = 'Fine Issued';

        const updatedVehicleBuffer = Buffer.from(JSON.stringify(violationDetails));
        await ctx.stub.putState(vehicleId, updatedVehicleBuffer);

        return `Vehicle with ${vehicleId} is fined with ${fineamount}`;
    } else {
        return 'Violation does not match the vehicle specifications';
    }
}

       

    
async getLatestAccidentId(ctx) {
    const buffer = await ctx.stub.getState('latestAccidentId');
    if (!buffer || buffer.length === 0) {
        throw new Error('No accident ID found');
    }
    return buffer.toString();
}
 
    
    
    
    
    // TMA creates accident report and passes it to Law Enforcement

    async createAccidentReport(ctx, accidentId, vehicleId, registrationNumber, accidentDetails) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'TrafficManagementMSP') {
            
            // Check if accidentId is unique
            const exists = await this.accidentExists(ctx, accidentId);
            if (exists) {
                throw new Error(`The accident with ID ${accidentId} already exists`);
            }
    
            // Check if vehicleId is unique (if you intend to check vehicleId instead of registration number)
            const vehicleExists = await this.vehicleExists(ctx, vehicleId);
            if (!vehicleExists) {
                throw new Error(`The vehicle with ID ${vehicleId} does not exist`);
            }

            // Fetch the vehicle details
        const vehicleData = await this.readVehicle(ctx, vehicleId);
        if (vehicleData.registrationNumber !== registrationNumber) {
            throw new Error(`The provided registration number ${registrationNumber} does not match the vehicle's registration number`);
        }
    
            // Create accident report details
            const accident = {
                accidentId,
                vehicleId,
                registrationNumber,
                accidentDetails,
                status: 'Accident Reported',
                assetType: 'Accident'
            };
            const buffer = Buffer.from(JSON.stringify(accident));
            await ctx.stub.putState(accidentId, buffer);

 // Store the accidentId in a separate key for easier retrieval if needed
 await ctx.stub.putState('latestAccidentId', Buffer.from(accidentId));


        } else {
            return `User under MSP: ${mspID} cannot perform this action`;
        }
    }
    
    async readAccidentReport(ctx, accidentId) {
        const exists = await this.accidentExists(ctx, accidentId);
        if (!exists) {
            throw new Error(`The accident with ID ${accidentId} does not exist`);
        }
        const buffer = await ctx.stub.getState(accidentId);
        return JSON.parse(buffer.toString());
    }
    


    
    async giveInsurance(ctx, accidentId, registrationNumber) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID !== 'InsuranceCompanyMSP') {
            throw new Error(`Only the Insurance Company can grant insurance based on an accident report.`);
        }
    
        // Retrieve accident report from public state database
        const accidentData = await ctx.stub.getState(accidentId);
    
        if (!accidentData || accidentData.length === 0) {
            return `No accident report found for accident ID: ${accidentId}`;
        }
    
        const accidentReport = JSON.parse(accidentData.toString());
    
        // Verify if the registration number matches
        if (accidentReport.registrationNumber !== registrationNumber) {
            return `No matching accident report found for registration number: ${registrationNumber}`;
        }
    
        return `Insurance has been granted for the vehicle with registration number ${registrationNumber}, based on accident report ID: ${accidentId}.`;
    }



    async queryAllVehicles(ctx) {
        const queryString = {
            selector: {
                assetType: 'VehicleDetails'
            }
        };

        let resultIterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        let result = await this._getAllResults(resultIterator);
        return JSON.stringify(result)

    }

    async getVehiclesByRange(ctx, startKey, endKey) {
        let resultIterator = await ctx.stub.getStateByRange(startKey, endKey);
        let result = await this._getAllResults(resultIterator);
        return JSON.stringify(result)
    }

    async getVehicleHistory(ctx, vehicleId) {
        let resultIterator = await ctx.stub.getHistoryForKey(vehicleId)
        let result = await this._getAllResults(resultIterator, true);
        return JSON.stringify(result)
    }

    async _getAllResults(iterator, isHistory) {
        let allResult = [];

        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.txId
                    jsonRes.Timestamp = res.value.timestamp
                    jsonRes.Record = JSON.parse(res.value.value.toString())
                }
                else {
                    jsonRes.Key = res.value.key;
                    jsonRes.Record = JSON.parse(res.value.value.toString());
                }
                allResult.push(jsonRes)
            }
            res = await iterator.next()
        }
        await iterator.close()
        return allResult
    }


}

module.exports = TrafficManagementContract;

