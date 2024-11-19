# 🚦 Smart Traffic Management with Hyperledger Fabric 🚀
TrafficTracker is a blockchain-based traffic management system built using Hyperledger Fabric. This project uses a consortium of four organizations to ensure transparency, efficiency, and trust in handling vehicle registrations, traffic violations, and accident reports.

## 🌐 Project Overview
TrafficTracker leverages Hyperledger Fabric to create a secure and transparent supply chain of information related to traffic management. The system consists of four key organizations: MVD (Motor Vehicle Department), Traffic Management Authority, Law Enforcement, and the Insurance Company. It ensures data privacy and access control through private data collections.

## 🏛️ Organizations and Their Roles
### 1. MVD (Motor Vehicle Department)
Responsibilities:
- Register and manage vehicle information.
- Validate traffic violation reports received from the Traffic Management Authority.
- Issue fines to vehicles based on validated traffic violations.
Data Access:
- Shares a private data collection with the Traffic Management Authority for secure communication.
### 2. Traffic Management Authority
Responsibilities:
- Create and submit traffic violation reports to the MVD.
- Generate accident reports and share them with Law Enforcement.
Data Access:
- Maintains a private data collection with the MVD for sharing traffic violation reports.
### 3. Law Enforcement
Responsibilities:
- Access accident reports created by the Traffic Management Authority.
- Transfer accident report data to the Insurance Company.
Data Access:
- Can read accident reports shared by the Traffic Management Authority.
### 4. Insurance Company
Responsibilities:
- Review accident reports received from Law Enforcement.
- Provide insurance to the affected vehicle based on the accident report details.
Data Access:
- Reads accident reports passed on by Law Enforcement.
## 🚀 Getting Started
Prerequisites
- Docker
- Node.js
- Hyperledger Fabric binaries and samples
## Installation Steps
1. Clone the repository:
```html
git clone git@github.com:Sneha-p1/Traffic_management_Fabric.git
```
2. Set up Hyperledger Fabric network:
- Navigate to the `Fabric-network-Traffic` folder and run the following script to bring up the Fabric network:
```html
./startTrafficNetwork1.sh
```
- To stop the network, use:
```html
./stopTrafficNetwork.sh
```
3. Deploy Chaincode:
- Navigate to the chaincode folder and deploy trafficContract using the Fabric CLI.
4. Run the TrafficTrack App:
- Navigate to the `TrafficManagementApp` directory and install dependencies:
```html
npm install
```
- To stop the network, use:
```html
npm run dev
```






