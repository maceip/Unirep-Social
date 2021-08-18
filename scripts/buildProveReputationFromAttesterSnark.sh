#!/bin/bash

set -e

cd "$(dirname "$0")"
cd ..
mkdir -p build

<<<<<<< HEAD
NODE_OPTIONS=--max-old-space-size=8192 npx ts-node scripts/buildSnarks.ts -i circuits/test/proveReputationFromAttester_test.circom -j build/proveReputationFromAttesterCircuit.r1cs -w build/proveReputationFromAttester.wasm -y build/proveReputationFromAttester.sym -p build/proveReputationFromAttesterPk.json -v build/proveReputationFromAttesterVk.json -s build/ReputationFromAttesterVerifier.sol -vs ReputationFromAttesterVerifier -pr build/proveReputationFromAttester.params -r
=======
NODE_OPTIONS=--max-old-space-size=8192 npx ts-node scripts/buildSnarks.ts -i circuits/test/proveReputationFromAttester_test.circom -j build/proveReputationFromAttesterCircuit.r1cs -w build/proveReputationFromAttester.wasm -y build/proveReputationFromAttester.sym -s build/ReputationFromAttesterVerifier.sol -pt build/powersOfTau28_hez_final_17.ptau -zk build/proveReputationFromAttester.zkey -vs ReputationFromAttesterVerifier
>>>>>>> 58e0402c34216380aade2635e0f8ff1a0271867f

echo 'Copying ReputationVerifier.sol to contracts/'
cp ./build/ReputationFromAttesterVerifier.sol ./contracts/