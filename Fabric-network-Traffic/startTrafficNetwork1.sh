#!/bin/bash

echo "------------Register the ca admin for each organization—----------------"

docker compose -f docker/docker-compose-ca.yaml up -d
sleep 3
sudo chmod -R 777 organizations/

echo "------------Register and enroll the users for each organization—-----------"

chmod +x registerEnroll.sh

./registerEnroll.sh
sleep 3

echo "—-------------Build the infrastructure—-----------------"

docker compose -f docker/docker-compose-4org.yaml up -d
sleep 3

echo "-------------Generate the genesis block—-------------------------------"

export FABRIC_CFG_PATH=${PWD}/config

export CHANNEL_NAME=trafficchannel

configtxgen -profile ChannelUsingRaft -outputBlock ${PWD}/channel-artifacts/${CHANNEL_NAME}.block -channelID $CHANNEL_NAME

echo "------ Create the application channel------"

export ORDERER_CA=./organizations/ordererOrganizations/traffic.com/orderers/orderer.traffic.com/msp/tlscacerts/tlsca.traffic.com-cert.pem

export ORDERER_ADMIN_TLS_SIGN_CERT=./organizations/ordererOrganizations/traffic.com/orderers/orderer.traffic.com/tls/server.crt

export ORDERER_ADMIN_TLS_PRIVATE_KEY=./organizations/ordererOrganizations/traffic.com/orderers/orderer.traffic.com/tls/server.key

osnadmin channel join --channelID $CHANNEL_NAME --config-block ./channel-artifacts/$CHANNEL_NAME.block -o localhost:7053 --ca-file $ORDERER_CA --client-cert $ORDERER_ADMIN_TLS_SIGN_CERT --client-key $ORDERER_ADMIN_TLS_PRIVATE_KEY
sleep 2
osnadmin channel list -o localhost:7053 --ca-file $ORDERER_CA --client-cert $ORDERER_ADMIN_TLS_SIGN_CERT --client-key $ORDERER_ADMIN_TLS_PRIVATE_KEY
sleep 2

export FABRIC_CFG_PATH=./peercfg
export TRAFFICMANAGEMENT_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/trafficManagement.traffic.com/peers/peer0.trafficManagement.traffic.com/tls/ca.crt
export MVD_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/mvd.traffic.com/peers/peer0.mvd.traffic.com/tls/ca.crt
export LAWENFORCEMENT_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/lawEnforcement.traffic.com/peers/peer0.lawEnforcement.traffic.com/tls/ca.crt
export INSURANCECOMPANY_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/insuranceCompany.traffic.com/peers/peer0.insuranceCompany.traffic.com/tls/ca.crt


export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID=TrafficManagementMSP
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/trafficManagement.traffic.com/peers/peer0.trafficManagement.traffic.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/trafficManagement.traffic.com/users/Admin@trafficManagement.traffic.com/msp
export CORE_PEER_ADDRESS=localhost:7051
sleep 2

export ORDERER_CA=${PWD}/organizations/ordererOrganizations/traffic.com/orderers/orderer.traffic.com/msp/tlscacerts/tlsca.traffic.com-cert.pem

export ORDERER_ADMIN_TLS_SIGN_CERT=${PWD}/organizations/ordererOrganizations/traffic.com/orderers/orderer.traffic.com/tls/server.crt

export ORDERER_ADMIN_TLS_PRIVATE_KEY=${PWD}/organizations/ordererOrganizations/traffic.com/orderers/orderer.traffic.com/tls/server.key


echo "—---------------Join trafficManagement peer0 to the channel—-------------"

echo ${FABRIC_CFG_PATH}
sleep 2
peer channel join -b ${PWD}/channel-artifacts/${CHANNEL_NAME}.block
sleep 3

echo "-----channel List----"
peer channel list
sleep 1

echo "—-------------trafficManagement anchor peer update—-----------"


peer channel fetch config ${PWD}/channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.traffic.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
sleep 1

cd channel-artifacts

configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json
cp config.json config_copy.json

jq '.channel_group.groups.Application.groups.TrafficManagementMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.trafficManagement.traffic.com","port": 7051}]},"version": "0"}}' config_copy.json > modified_config.json

configtxlator proto_encode --input config.json --type common.Config --output config.pb
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id ${CHANNEL_NAME} --original config.pb --updated modified_config.pb --output config_update.pb

configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output config_update_in_envelope.pb
cd ..

peer channel update -f ${PWD}/channel-artifacts/config_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050  --ordererTLSHostnameOverride orderer.traffic.com --tls --cafile $ORDERER_CA
sleep 1

# echo "—---------------package chaincode—-------------"


peer lifecycle chaincode package traffic-contract.tar.gz --path ${PWD}/../TrafficChaincode --lang node --label traffic-contract_1.0
sleep 1


# echo "—---------------install chaincode in trafficManagement peer—-------------"

peer lifecycle chaincode install traffic-contract.tar.gz
sleep 3

peer lifecycle chaincode queryinstalled
sleep 1

export CC_PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid traffic-contract.tar.gz)

# echo "—---------------Approve chaincode in trafficManagement peer—-------------"

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.traffic.com --channelID $CHANNEL_NAME --name traffic-contract --version 1.0 --collections-config ../TrafficChaincode/collection-traffic.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent



sleep 1

echo "—---------------Join trafficManagement peer1 to the channel—-------------"

export CORE_PEER_LOCALMSPID=TrafficManagementMSP 
export CORE_PEER_ADDRESS=localhost:8050
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/trafficManagement.traffic.com/peers/peer1.trafficManagement.traffic.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/trafficManagement.traffic.com/users/Admin@trafficManagement.traffic.com/msp

echo ${FABRIC_CFG_PATH}
sleep 2
peer channel join -b ${PWD}/channel-artifacts/${CHANNEL_NAME}.block
sleep 3

echo "-----channel List----"
peer channel list

sleep 1

export CORE_PEER_LOCALMSPID=MVDMSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/mvd.traffic.com/peers/peer0.mvd.traffic.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/mvd.traffic.com/users/Admin@mvd.traffic.com/msp
export CORE_PEER_ADDRESS=localhost:9051 

echo "—---------------Join mvd peer0 to the channel—-------------"

peer channel join -b ${PWD}/channel-artifacts/$CHANNEL_NAME.block
sleep 1
peer channel list

echo "—-------------mvd anchor peer update—-----------"


peer channel fetch config ${PWD}/channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.traffic.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
sleep 1

cd channel-artifacts

configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json

cp config.json config_copy.json

jq '.channel_group.groups.Application.groups.MVDMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.mvd.traffic.com","port": 9051}]},"version": "0"}}' config_copy.json > modified_config.json

configtxlator proto_encode --input config.json --type common.Config --output config.pb
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id ${CHANNEL_NAME} --original config.pb --updated modified_config.pb --output config_update.pb

configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output config_update_in_envelope.pb

cd ..

peer channel update -f ${PWD}/channel-artifacts/config_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050  --ordererTLSHostnameOverride orderer.traffic.com --tls --cafile $ORDERER_CA
peer channel getinfo -c $CHANNEL_NAME
sleep 1

# echo "—---------------install chaincode in mvd peer—-------------"

peer lifecycle chaincode install traffic-contract.tar.gz
sleep 3

peer lifecycle chaincode queryinstalled
sleep 1

export CC_PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid traffic-contract.tar.gz)

# echo "—---------------Approve chaincode in mvd peer—-------------"

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.traffic.com --channelID $CHANNEL_NAME --name traffic-contract --version 1.0 --collections-config ../TrafficChaincode/collection-traffic.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent


sleep 1



export CORE_PEER_LOCALMSPID=LawEnforcementMSP 
export CORE_PEER_ADDRESS=localhost:11051 
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/lawEnforcement.traffic.com/peers/peer0.lawEnforcement.traffic.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/lawEnforcement.traffic.com/users/Admin@lawEnforcement.traffic.com/msp

echo "—---------------Join lawEnforcement peer0 to the channel—-------------"

peer channel join -b ${PWD}/channel-artifacts/$CHANNEL_NAME.block
sleep 1
peer channel list

echo "—-------------lawEnforcement anchor peer update—-----------"

# peer channel join -b ${PWD}/channel-artifacts/$CHANNEL_NAME.block --tls --cafile $ORDERER_CA

peer channel fetch config ${PWD}/channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.traffic.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
sleep 1

cd channel-artifacts

configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json

cp config.json config_copy.json

jq '.channel_group.groups.Application.groups.LawEnforcementMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.lawEnforcement.traffic.com","port": 11051}]},"version": "0"}}' config_copy.json > modified_config.json

configtxlator proto_encode --input config.json --type common.Config --output config.pb
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id ${CHANNEL_NAME} --original config.pb --updated modified_config.pb --output config_update.pb

configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output config_update_in_envelope.pb

cd ..

peer channel update -f ${PWD}/channel-artifacts/config_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050  --ordererTLSHostnameOverride orderer.traffic.com --tls --cafile $ORDERER_CA
sleep 2

# echo "—---------------install chaincode in lawEnforcement peer—-------------"

peer lifecycle chaincode install traffic-contract.tar.gz
sleep 3

peer lifecycle chaincode queryinstalled
sleep 1

export CC_PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid traffic-contract.tar.gz)

# echo "—---------------Approve chaincode in lawEnforcement peer—-------------"

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.traffic.com --channelID $CHANNEL_NAME --name traffic-contract --version 1.0 --collections-config ../TrafficChaincode/collection-traffic.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent



sleep 1




export CORE_PEER_LOCALMSPID=InsuranceCompanyMSP 
export CORE_PEER_ADDRESS=localhost:7044
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/insuranceCompany.traffic.com/peers/peer0.insuranceCompany.traffic.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/insuranceCompany.traffic.com/users/Admin@insuranceCompany.traffic.com/msp

echo "—---------------Join insuranceCompany peer to the channel—-------------"

peer channel join -b ${PWD}/channel-artifacts/$CHANNEL_NAME.block
sleep 1
peer channel list

echo "—-------------insuranceCompany anchor peer update—-----------"


peer channel fetch config ${PWD}/channel-artifacts/config_block.pb -o localhost:7050 --ordererTLSHostnameOverride orderer.traffic.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
sleep 1

cd channel-artifacts

configtxlator proto_decode --input config_block.pb --type common.Block --output config_block.json
jq '.data.data[0].payload.data.config' config_block.json > config.json

cp config.json config_copy.json

jq '.channel_group.groups.Application.groups.InsuranceCompanyMSP.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "peer0.insuranceCompany.traffic.com","port": 7044}]},"version": "0"}}' config_copy.json > modified_config.json

configtxlator proto_encode --input config.json --type common.Config --output config.pb
configtxlator proto_encode --input modified_config.json --type common.Config --output modified_config.pb
configtxlator compute_update --channel_id ${CHANNEL_NAME} --original config.pb --updated modified_config.pb --output config_update.pb

configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate --output config_update.json
echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope --output config_update_in_envelope.pb

cd ..

peer channel update -f ${PWD}/channel-artifacts/config_update_in_envelope.pb -c $CHANNEL_NAME -o localhost:7050  --ordererTLSHostnameOverride orderer.traffic.com --tls --cafile $ORDERER_CA
sleep 1


# echo "—---------------install chaincode in insuranceCompany peer—-------------"

peer lifecycle chaincode install traffic-contract.tar.gz
sleep 3

peer lifecycle chaincode queryinstalled
sleep 1

export CC_PACKAGE_ID=$(peer lifecycle chaincode calculatepackageid traffic-contract.tar.gz)

# echo "—---------------Approve chaincode in insuranceCompany peer—-------------"

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.traffic.com --channelID $CHANNEL_NAME --name traffic-contract --version 1.0 --collections-config ../TrafficChaincode/collection-traffic.json --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA --waitForEvent



sleep 1




echo "—---------------Commit chaincode in insuranceCompany peer—-------------"

peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name traffic-contract --version 1.0 --sequence 1 --collections-config ../TrafficChaincode/collection-traffic.json --tls --cafile $ORDERER_CA --output json

peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.traffic.com --channelID $CHANNEL_NAME --name traffic-contract --version 1.0 --sequence 1 --collections-config ../TrafficChaincode/collection-traffic.json --tls --cafile $ORDERER_CA --peerAddresses localhost:7051 --tlsRootCertFiles $TRAFFICMANAGEMENT_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $MVD_PEER_TLSROOTCERT --peerAddresses localhost:11051 --tlsRootCertFiles $LAWENFORCEMENT_PEER_TLSROOTCERT --peerAddresses localhost:7044 --tlsRootCertFiles $INSURANCECOMPANY_PEER_TLSROOTCERT

sleep 1

peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name traffic-contract --cafile $ORDERER_CA