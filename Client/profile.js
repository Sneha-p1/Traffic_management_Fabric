let profile = {
    MVD: {
        "cryptoPath": "../Fabric-network-Traffic/organizations/peerOrganizations/mvd.traffic.com", 
		"keyDirectoryPath": "../Fabric-network-Traffic/organizations/peerOrganizations/mvd.traffic.com/users/User1@mvd.traffic.com/msp/keystore/",
        "certPath":     "../Fabric-network-Traffic/organizations/peerOrganizations/mvd.traffic.com/users/User1@mvd.traffic.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../Fabric-network-Traffic/organizations/peerOrganizations/mvd.traffic.com/peers/peer0.mvd.traffic.com/tls/ca.crt",
		"peerEndpoint": "localhost:9051",
		"peerHostAlias":  "peer0.mvd.traffic.com",
        "mspId": "MVDMSP"
    },
    trafficManagement: {
        "cryptoPath": "../Fabric-network-Traffic/organizations/peerOrganizations/trafficManagement.traffic.com", 
		"keyDirectoryPath": "../Fabric-network-Traffic/organizations/peerOrganizations/trafficManagement.traffic.com/users/User1@trafficManagement.traffic.com/msp/keystore/",
        "certPath":     "../Fabric-network-Traffic/organizations/peerOrganizations/trafficManagement.traffic.com/users/User1@trafficManagement.traffic.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../Fabric-network-Traffic/organizations/peerOrganizations/trafficManagement.traffic.com/peers/peer0.trafficManagement.traffic.com/tls/ca.crt",
		"peerEndpoint": "localhost:7051",
		"peerHostAlias":  "peer0.trafficManagement.traffic.com",
        "mspId": "TrafficManagementMSP" 
    },
    lawEnforcement: {
        "cryptoPath": "../Fabric-network-Traffic/organizations/peerOrganizations/lawEnforcement.traffic.com", 
		"keyDirectoryPath": "../Fabric-network-Traffic/organizations/peerOrganizations/lawEnforcement.traffic.com/users/User1@lawEnforcement.traffic.com/msp/keystore/",
        "certPath":     "../Fabric-network-Traffic/organizations/peerOrganizations/lawEnforcement.traffic.com/users/User1@lawEnforcement.traffic.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../Fabric-network-Traffic/organizations/peerOrganizations/lawEnforcement.traffic.com/peers/peer0.lawEnforcement.traffic.com/tls/ca.crt",
		"peerEndpoint": "localhost:11051",
		"peerHostAlias":  "peer0.lawEnforcement.traffic.com",
        "mspId": "LawEnforcementMSP"
    },
    insuranceCompany: {
        "cryptoPath": "../Fabric-network-Traffic/organizations/peerOrganizations/insuranceCompany.traffic.com", 
		"keyDirectoryPath": "../Fabric-network-Traffic/organizations/peerOrganizations/insuranceCompany.traffic.com/users/User1@insuranceCompany.traffic.com/msp/keystore/",
        "certPath":     "../Fabric-network-Traffic/organizations/peerOrganizations/insuranceCompany.traffic.com/users/User1@insuranceCompany.traffic.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../Fabric-network-Traffic/organizations/peerOrganizations/insuranceCompany.traffic.com/peers/peer0.insuranceCompany.traffic.com/tls/ca.crt",
		"peerEndpoint": "localhost:7044",
		"peerHostAlias":  "peer0.insuranceCompany.traffic.com",
        "mspId": "InsuranceCompanyMSP"
    }
}
module.exports = { profile }