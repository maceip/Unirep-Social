# Unirep Social v1.0.0

For more information about Unirep Social, refer to the [documentation](https://vivi432.gitbook.io/unirep-social/)

## Install and build

```
yarn install
```

then run

```
yarn compile
```

to compile Unirep Social contracts if contracts change

## Goerli Testnet

-   The address of Unirep Social smart contract on goerli testnet
    ```
    0x377d747C0040C0460dCAfaFBb5bAddc7a6F7e5DB
    ```
    See [Etherscan](https://goerli.etherscan.io/address/0x377d747C0040C0460dCAfaFBb5bAddc7a6F7e5DB)
-   The address of Unirep smart contract on goerli testnet
    ```
    0x861F280876Ba65219Cb50D217ffA11237271b0B6
    ```
    See [Etherscan](https://goerli.etherscan.io/address/0x861F280876Ba65219Cb50D217ffA11237271b0B6)
-   Apply for an account from [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/), change the `DEFAULT_ETH_PROVIDER` to the given provider url
    For example
    ```
    const DEFAULT_ETH_PROVIDER = https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}
    ```
-   Get ether on the goerli testnet from [Goerli Faucet](https://faucet.goerli.mudit.blog/)

## Testing

```
yarn test
```

to run test scripts

```
yarn test-cli
```

to test all cli commands.

## Example flow using cli commands

#### 1. Spin up the testing chain

```
npx hardhat node
```

-   NOTE: a list of default accounts will be printed, choose one of them to be the deployer's account
-   For example, choose `0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563` as the deployer's private key, and set it in `.env` file.

#### 2. Deploy Unirep contract

```
npx ts-node cli/index.ts deploy -d 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563
```

-   NOTE: `-d` is the deployer's private key
-   NOTE: If Unirep contract has not been deployed, both Unirep and Unirep Social contract's address will be printed. For example,

```
Unirep: 0x8021567131aCE794d2A365B72f800E8B71b2486F
Unirep Social: 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2
```

-   Then we use the Unirep Social contract's address to interact with.

#### 3. User generates Unirep identity

```
npx ts-node cli/index.ts genUnirepIdentity
```

-   base64url encoded identity and identity commitment will be printed, For example,

```
Unirep.identity.WyI5M2QzYjcyZjQxMjI4M2U0OTAzNDhhZDZiN2E4ZWEyMjdjNzM2OWIzMzYxZWZmNGJhOTViNjVkMWVkMTI2NDVjIiwiZmZjNTdjZGIyNzU1NjhiOWIzYTIyODBmMWNlN2JiNmM2NDE3MzM3ZTAyMzZjZGY0YjM5MmY0ZTNlOWUyYjciLCI0M2M1M2IyZWI4N2IyY2Y2ZjdhODA3YjZmM2RiODQ0NmNkMGU3NzlhZmE3MDUyNTI4ODRiYjZlMDQzMjcwMiJd
Unirep.identityCommitment.YzY1N2VlODVkOWJlNWU3NzQ2MjMwNDZkNzRhYWE1OTY4MzMwYTIyYTEwNmM1YzRhMjQ2MzRmNDZkMjY1N2Vm
```

#### 4. User signs up

-   Sign up user's semaphore identity with identity commitment with the prefix `Unirep.identityCommitment`.

```
npx ts-node cli/index.ts userSignup \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2 \
    -c Unirep.identityCommitment.YzY1N2VlODVkOWJlNWU3NzQ2MjMwNDZkNzRhYWE1OTY4MzMwYTIyYTEwNmM1YzRhMjQ2MzRmNDZkMjY1N2Vm \
    -d 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563
```

-   NOTE: `-x` is the contract address of Unirep Social, `-c` is the identity commitment

#### 5. User generates reputation proof for post

```
npx ts-node cli/index.ts genReputationProof \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2 \
    -id Unirep.identity.WyI5M2QzYjcyZjQxMjI4M2U0OTAzNDhhZDZiN2E4ZWEyMjdjNzM2OWIzMzYxZWZmNGJhOTViNjVkMWVkMTI2NDVjIiwiZmZjNTdjZGIyNzU1NjhiOWIzYTIyODBmMWNlN2JiNmM2NDE3MzM3ZTAyMzZjZGY0YjM5MmY0ZTNlOWUyYjciLCI0M2M1M2IyZWI4N2IyY2Y2ZjdhODA3YjZmM2RiODQ0NmNkMGU3NzlhZmE3MDUyNTI4ODRiYjZlMDQzMjcwMiJd \
    -n 0 \
    -act post
```

-   NOTE: `-n` is the nonce of the epoch key the user chooses to display, `-act` is the actions that can be performed in Unirep Social, there are: `post`, `comment`, and `vote`
-   base64url encoded reputation proof and public signals will be printed, For example,

```
Epoch key of epoch 1 and nonce 0: 1920144953
Unirep.reputation.proof.WyIxMzE1MTA2MDg5Mjk2NTk5NTYxMjU1NTEwMTU0ODU1MTYyMDczNTc1NjA1Mzk3NjM4ODQ1NTQ4MDQ2MDExNjEwMTI3NDUwMjI3NTg0MyIsIjMyMDY4NjQ1MzY5NDM5MDc3MDYwMTYzNTAyMDQ3NDY4Nzk2Njc2MDQ2NzU3MTgxNzgxNjAwNTEwMjMwODEyNDk2ODI0MDY1MTY4MTQiLCIyMTAyOTQxMzA3MjUxNDI0NzUyMjU0MTgxMDQ4MDgxMjM1MDQ5MzgwMzg4MzUzMjA2MzcwMzk0MTI4NTQzNDU5NDU5OTg4MjE1ODc3NiIsIjYxODI0NzI0NzY0NjM5MjgxOTA0Mjg2ODA0NTYwOTczNTg0MzEzMzgzODUzNzY1NDA3MjE0MTgzMzgzNDA1OTY1MTcxNjYyMzU0MTIiLCIxMTMzNzI0NzUzNzQ3OTQ4OTY2NTcwMDU0NzkzMDMxMzA5NjYyMzc5NDY1NjgxMzU2NjY5MDI1ODcwMzQ3MDcyMjczMzc0MjEyOTM4MyIsIjIxNDAzMzAyNDM5MTcxNTU2ODY1Nzk2Mzk1NjQ4ODc0OTAyNDEzNzUzMTcwMTA5MjE2OTM3MjQ0ODk2OTE3NzkxODU1NzcxMDA3NDQ1IiwiMzg1MTMyNzYwOTE5MjMwOTEyMjY5NzA3MjcwMzMzODQxOTI1NjYwMTMwMzI5NTAzMTUzNDQ1OTcxMTY5MTQ0MzU2NjUxODk1NjI5MSIsIjEyNTM0MzQ1NTUyMzUxOTEwNTQ1MTA2ODE0Njg4MTYwNTY5MDI3Mzg1MTAwNjU4MjM3MTE1NTcyMDI1MDM2ODc5ODMzNDI3NzU0MjE0Il0
Unirep.reputation.publicSignals.WyI3NzA3NDU5NjQwODM1MDM1NzI1NDAyNzA1MDEyMDMxNDc3NTc5ODgxMDI1MTkzMTEzNDg0Nzc0NTAzNzA3NzAyNDcwODExMjQzOTY3IiwiMTQ4Njk1MDA3NDY2MzY3MDEyMzcyNTIxNzc1MzI4Mjg0NzUyNTAzOTgzMTk1NDk3OTEyMTc4ODY3NDI0NTU3MTkzMDE1Njg3MTM5NjEiLCI3MjMxNDY2NzQ1NTE1MjE2MTE1MzcxMTYxODc0OTc2NTY4MzkyOTgwMjIxODU1Mjg4NTQ5Nzc0OTc4NTU0MTA1OTc1NzkwOTg5ODQ5IiwiMTI0OTYyMDc3MzY3ODQzMTg0MTI0NzcxMzk0Njg2NDk4NjY0NjQ2NTczMDA3OTgyOTc1Mzc4ODcwOTc2MjExOTY2OTA4NTQzMDI3NjQiLCI1MzQ2NTEzMDMwNDU2NDYxNjIzOTg0NDU2MjQ2ODE5NjY3MjkyMTYxMjkwOTgyNDc4MjAwMDg3NjU1MjE3NDYxMTk1NTg3Njk0NjQ5IiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIxIiwiMTkyMDE0NDk1MyIsIjY0MzM4MDI0MDI0OTQwNDA4Nzc5NTMxNTkzNzY1MTY3MzQ2OTcyMjI1ODMyNzIyNzc1NDQzOTE2OTcyNzE5MTc2MDQ1NjIyMTc4MzQiLCIxIiwiNSIsIjAiLCIwIiwiMCJd
```

#### 6. User submits a post with a reputation proof

```
npx ts-node cli/index.ts publishPost \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2 \
    -tx postText \
    -d 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563 \
    -p Unirep.reputation.publicSignals.WyI3NzA3NDU5NjQwODM1MDM1NzI1NDAyNzA1MDEyMDMxNDc3NTc5ODgxMDI1MTkzMTEzNDg0Nzc0NTAzNzA3NzAyNDcwODExMjQzOTY3IiwiMTQ4Njk1MDA3NDY2MzY3MDEyMzcyNTIxNzc1MzI4Mjg0NzUyNTAzOTgzMTk1NDk3OTEyMTc4ODY3NDI0NTU3MTkzMDE1Njg3MTM5NjEiLCI3MjMxNDY2NzQ1NTE1MjE2MTE1MzcxMTYxODc0OTc2NTY4MzkyOTgwMjIxODU1Mjg4NTQ5Nzc0OTc4NTU0MTA1OTc1NzkwOTg5ODQ5IiwiMTI0OTYyMDc3MzY3ODQzMTg0MTI0NzcxMzk0Njg2NDk4NjY0NjQ2NTczMDA3OTgyOTc1Mzc4ODcwOTc2MjExOTY2OTA4NTQzMDI3NjQiLCI1MzQ2NTEzMDMwNDU2NDYxNjIzOTg0NDU2MjQ2ODE5NjY3MjkyMTYxMjkwOTgyNDc4MjAwMDg3NjU1MjE3NDYxMTk1NTg3Njk0NjQ5IiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIxIiwiMTkyMDE0NDk1MyIsIjY0MzM4MDI0MDI0OTQwNDA4Nzc5NTMxNTkzNzY1MTY3MzQ2OTcyMjI1ODMyNzIyNzc1NDQzOTE2OTcyNzE5MTc2MDQ1NjIyMTc4MzQiLCIxIiwiNSIsIjAiLCIwIiwiMCJd \
    -pf Unirep.reputation.proof.WyIxMzE1MTA2MDg5Mjk2NTk5NTYxMjU1NTEwMTU0ODU1MTYyMDczNTc1NjA1Mzk3NjM4ODQ1NTQ4MDQ2MDExNjEwMTI3NDUwMjI3NTg0MyIsIjMyMDY4NjQ1MzY5NDM5MDc3MDYwMTYzNTAyMDQ3NDY4Nzk2Njc2MDQ2NzU3MTgxNzgxNjAwNTEwMjMwODEyNDk2ODI0MDY1MTY4MTQiLCIyMTAyOTQxMzA3MjUxNDI0NzUyMjU0MTgxMDQ4MDgxMjM1MDQ5MzgwMzg4MzUzMjA2MzcwMzk0MTI4NTQzNDU5NDU5OTg4MjE1ODc3NiIsIjYxODI0NzI0NzY0NjM5MjgxOTA0Mjg2ODA0NTYwOTczNTg0MzEzMzgzODUzNzY1NDA3MjE0MTgzMzgzNDA1OTY1MTcxNjYyMzU0MTIiLCIxMTMzNzI0NzUzNzQ3OTQ4OTY2NTcwMDU0NzkzMDMxMzA5NjYyMzc5NDY1NjgxMzU2NjY5MDI1ODcwMzQ3MDcyMjczMzc0MjEyOTM4MyIsIjIxNDAzMzAyNDM5MTcxNTU2ODY1Nzk2Mzk1NjQ4ODc0OTAyNDEzNzUzMTcwMTA5MjE2OTM3MjQ0ODk2OTE3NzkxODU1NzcxMDA3NDQ1IiwiMzg1MTMyNzYwOTE5MjMwOTEyMjY5NzA3MjcwMzMzODQxOTI1NjYwMTMwMzI5NTAzMTUzNDQ1OTcxMTY5MTQ0MzU2NjUxODk1NjI5MSIsIjEyNTM0MzQ1NTUyMzUxOTEwNTQ1MTA2ODE0Njg4MTYwNTY5MDI3Mzg1MTAwNjU4MjM3MTE1NTcyMDI1MDM2ODc5ODMzNDI3NzU0MjE0Il0
```

-   NOTE: `-tx` is the post content, `-p` is the public signals of the reputation proof, and `-pf` is the reputation proof
-   The deployer will verify the proof and submit the post with the deployer's private key
-   After the proof is submitted, a proof index will be printed, then other users can upvote or downvote this epoch key with the proof index.

```
Verify reputation proof of epoch key 1920144953 with 5 reputation spent in transaction and minimum reputation 0 succeed
Epoch key of epoch 1: 1920144953
Transaction hash: 0x724cc01ad7b084da45c8e67bc930958282a07bf3b7c4381e1d7a9cdc5ae63a99
Proof index: 3
```

#### 7. Verify reputation proof

```
npx ts-node cli/index.ts verifyReputationProof \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2 \
    -pf Unirep.reputation.proof.WyIxMzE1MTA2MDg5Mjk2NTk5NTYxMjU1NTEwMTU0ODU1MTYyMDczNTc1NjA1Mzk3NjM4ODQ1NTQ4MDQ2MDExNjEwMTI3NDUwMjI3NTg0MyIsIjMyMDY4NjQ1MzY5NDM5MDc3MDYwMTYzNTAyMDQ3NDY4Nzk2Njc2MDQ2NzU3MTgxNzgxNjAwNTEwMjMwODEyNDk2ODI0MDY1MTY4MTQiLCIyMTAyOTQxMzA3MjUxNDI0NzUyMjU0MTgxMDQ4MDgxMjM1MDQ5MzgwMzg4MzUzMjA2MzcwMzk0MTI4NTQzNDU5NDU5OTg4MjE1ODc3NiIsIjYxODI0NzI0NzY0NjM5MjgxOTA0Mjg2ODA0NTYwOTczNTg0MzEzMzgzODUzNzY1NDA3MjE0MTgzMzgzNDA1OTY1MTcxNjYyMzU0MTIiLCIxMTMzNzI0NzUzNzQ3OTQ4OTY2NTcwMDU0NzkzMDMxMzA5NjYyMzc5NDY1NjgxMzU2NjY5MDI1ODcwMzQ3MDcyMjczMzc0MjEyOTM4MyIsIjIxNDAzMzAyNDM5MTcxNTU2ODY1Nzk2Mzk1NjQ4ODc0OTAyNDEzNzUzMTcwMTA5MjE2OTM3MjQ0ODk2OTE3NzkxODU1NzcxMDA3NDQ1IiwiMzg1MTMyNzYwOTE5MjMwOTEyMjY5NzA3MjcwMzMzODQxOTI1NjYwMTMwMzI5NTAzMTUzNDQ1OTcxMTY5MTQ0MzU2NjUxODk1NjI5MSIsIjEyNTM0MzQ1NTUyMzUxOTEwNTQ1MTA2ODE0Njg4MTYwNTY5MDI3Mzg1MTAwNjU4MjM3MTE1NTcyMDI1MDM2ODc5ODMzNDI3NzU0MjE0Il0 \
    -p Unirep.reputation.publicSignals.WyI3NzA3NDU5NjQwODM1MDM1NzI1NDAyNzA1MDEyMDMxNDc3NTc5ODgxMDI1MTkzMTEzNDg0Nzc0NTAzNzA3NzAyNDcwODExMjQzOTY3IiwiMTQ4Njk1MDA3NDY2MzY3MDEyMzcyNTIxNzc1MzI4Mjg0NzUyNTAzOTgzMTk1NDk3OTEyMTc4ODY3NDI0NTU3MTkzMDE1Njg3MTM5NjEiLCI3MjMxNDY2NzQ1NTE1MjE2MTE1MzcxMTYxODc0OTc2NTY4MzkyOTgwMjIxODU1Mjg4NTQ5Nzc0OTc4NTU0MTA1OTc1NzkwOTg5ODQ5IiwiMTI0OTYyMDc3MzY3ODQzMTg0MTI0NzcxMzk0Njg2NDk4NjY0NjQ2NTczMDA3OTgyOTc1Mzc4ODcwOTc2MjExOTY2OTA4NTQzMDI3NjQiLCI1MzQ2NTEzMDMwNDU2NDYxNjIzOTg0NDU2MjQ2ODE5NjY3MjkyMTYxMjkwOTgyNDc4MjAwMDg3NjU1MjE3NDYxMTk1NTg3Njk0NjQ5IiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIxIiwiMTkyMDE0NDk1MyIsIjY0MzM4MDI0MDI0OTQwNDA4Nzc5NTMxNTkzNzY1MTY3MzQ2OTcyMjI1ODMyNzIyNzc1NDQzOTE2OTcyNzE5MTc2MDQ1NjIyMTc4MzQiLCIxIiwiNSIsIjAiLCIwIiwiMCJd
```

-   The verification result will be printed, for example:

```
Verify reputation proof of epoch key 1920144953 with 5 reputation spent in transaction and minimum reputation 0 succeed
```

#### 8. User generates reputation proof for comment

```
npx ts-node cli/index.ts genReputationProof \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2  \
    -id Unirep.identity.WyI5M2QzYjcyZjQxMjI4M2U0OTAzNDhhZDZiN2E4ZWEyMjdjNzM2OWIzMzYxZWZmNGJhOTViNjVkMWVkMTI2NDVjIiwiZmZjNTdjZGIyNzU1NjhiOWIzYTIyODBmMWNlN2JiNmM2NDE3MzM3ZTAyMzZjZGY0YjM5MmY0ZTNlOWUyYjciLCI0M2M1M2IyZWI4N2IyY2Y2ZjdhODA3YjZmM2RiODQ0NmNkMGU3NzlhZmE3MDUyNTI4ODRiYjZlMDQzMjcwMiJd \
    -n 0 \
    -act comment \
    -mr 15
```

-   NOTE: `-mr` is the minimum reputation that the user wants to show in the proof
-   base64url encoded reputation proof and public signals will be printed, For example,

```
Prove minimum reputation: 15
Epoch key of epoch 1 and nonce 0: 1920144953
Unirep.reputation.proof.WyI5NjIwNjQ2ODY1NTM1MTk3NjEzNzA2OTc5NDc1NjEwMzA3Njg3OTYzMzM3MjcwMTg5NDk0NjQwNDE3NDIzOTAxNzEzODg4MjM3MDU2IiwiMjAxMzQ2NDQzNjc3ODIyMDYxNzkwMzYxMTc4MTY1Njc5MDE2NDY3MDMxMzEzMzg1MDEzNDA5Mjg3OTU4NzQxNTE0MjM4OTU3NTk4ODgiLCIxMzg1Nzg2MDg3OTgyMjM0Nzk5NTU3MDg0NjQ3ODc0MDQ2OTczNTE0MzYzNjk0MjM0NjQwNDY5MTEyNzEyODc3OTI3MjE1MjUyNzMyOSIsIjc4ODQzNTcwOTM0ODMwNTQzODU0MzQzMTYzNzkwMTkwNDE5ODEwMTU0MDU4NDI2MTk1MDI2NTY0OTUxMjEwMDA0MTUzNTkwOTY4NTgiLCIyMzMxMzAxNTc4OTc4NTc3NTgxNzk5NzA2OTU0NTAzODk3MzE4MjY4MjMxOTA4MzkyMzgyNzMxMDE4NzQxNjMyMjY5MzQxODE0NDciLCI1NzYyNTI4Nzg4NzMyMDM4ODA2MTczMjY5MzgzMjgyNDM0ODM0MTU5NDIxNzg4NDg2MDgyNjA4ODY4Mjk5MTUzNzUxNDk4OTQ4MzI3IiwiMTUyOTE3NzY3ODY3NDc0MDc3MjA1NTMzMTI3ODY1MTQxNjY3NzY0NTY4ODM3NDI4NjEwODk5MDQ3NzE5NDAxODg4NzgxNzYyNDg2MTYiLCIxNDczMjI2OTMxNDgxMTQ3OTQxOTgyMzE2NTY5MzcxMTM3MDU0OTA5NTI4NTI0OTU5NzA0ODcyNTg1MDk1ODcwOTYwNzYwMjk5MTM5MiJd
Unirep.reputation.publicSignals.WyI3NzU0OTg3Njc0ODAwOTgyMDIzMjA2MDE3NDM1MjYxNjQ3MzcyOTE2NDI4MDYwNTk4NTQxMjA5ODg1Nzc2OTc4OTc1MDk3NTU0MjAxIiwiMjEwNzcxMzAzMjIzNTk2MDEzMTE2MTY2MTQzNDQ1NjMwODc1MDQxMjg1ODE0MjE2ODg2MzY4NjkyNzUxNjMzMzc2NjA5NDAzODIyMzIiLCIxNzg4NzEwNDE0MTcwOTI4NDcyNzYwNzUwMzkwNDcyODAzODg3MzMzMjc1NTYxODUxNDQ2MTkyMzkxODA4OTczNTk4MDk4NzQ5Mzc5OCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIxIiwiMTkyMDE0NDk1MyIsIjY0MzM4MDI0MDI0OTQwNDA4Nzc5NTMxNTkzNzY1MTY3MzQ2OTcyMjI1ODMyNzIyNzc1NDQzOTE2OTcyNzE5MTc2MDQ1NjIyMTc4MzQiLCIxIiwiMyIsIjE1IiwiMCIsIjAiXQ
```

#### 9. User submits a comment with a reputation proof

```
npx ts-node cli/index.ts leaveComment \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2  \
    -pid 0x724cc01ad7b084da45c8e67bc930958282a07bf3b7c4381e1d7a9cdc5ae63a99  \
    -tx commentText \
    -d 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563 \
    -p Unirep.reputation.publicSignals.WyI3NzU0OTg3Njc0ODAwOTgyMDIzMjA2MDE3NDM1MjYxNjQ3MzcyOTE2NDI4MDYwNTk4NTQxMjA5ODg1Nzc2OTc4OTc1MDk3NTU0MjAxIiwiMjEwNzcxMzAzMjIzNTk2MDEzMTE2MTY2MTQzNDQ1NjMwODc1MDQxMjg1ODE0MjE2ODg2MzY4NjkyNzUxNjMzMzc2NjA5NDAzODIyMzIiLCIxNzg4NzEwNDE0MTcwOTI4NDcyNzYwNzUwMzkwNDcyODAzODg3MzMzMjc1NTYxODUxNDQ2MTkyMzkxODA4OTczNTk4MDk4NzQ5Mzc5OCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIxIiwiMTkyMDE0NDk1MyIsIjY0MzM4MDI0MDI0OTQwNDA4Nzc5NTMxNTkzNzY1MTY3MzQ2OTcyMjI1ODMyNzIyNzc1NDQzOTE2OTcyNzE5MTc2MDQ1NjIyMTc4MzQiLCIxIiwiMyIsIjE1IiwiMCIsIjAiXQ \
    -pf Unirep.reputation.proof.WyI5NjIwNjQ2ODY1NTM1MTk3NjEzNzA2OTc5NDc1NjEwMzA3Njg3OTYzMzM3MjcwMTg5NDk0NjQwNDE3NDIzOTAxNzEzODg4MjM3MDU2IiwiMjAxMzQ2NDQzNjc3ODIyMDYxNzkwMzYxMTc4MTY1Njc5MDE2NDY3MDMxMzEzMzg1MDEzNDA5Mjg3OTU4NzQxNTE0MjM4OTU3NTk4ODgiLCIxMzg1Nzg2MDg3OTgyMjM0Nzk5NTU3MDg0NjQ3ODc0MDQ2OTczNTE0MzYzNjk0MjM0NjQwNDY5MTEyNzEyODc3OTI3MjE1MjUyNzMyOSIsIjc4ODQzNTcwOTM0ODMwNTQzODU0MzQzMTYzNzkwMTkwNDE5ODEwMTU0MDU4NDI2MTk1MDI2NTY0OTUxMjEwMDA0MTUzNTkwOTY4NTgiLCIyMzMxMzAxNTc4OTc4NTc3NTgxNzk5NzA2OTU0NTAzODk3MzE4MjY4MjMxOTA4MzkyMzgyNzMxMDE4NzQxNjMyMjY5MzQxODE0NDciLCI1NzYyNTI4Nzg4NzMyMDM4ODA2MTczMjY5MzgzMjgyNDM0ODM0MTU5NDIxNzg4NDg2MDgyNjA4ODY4Mjk5MTUzNzUxNDk4OTQ4MzI3IiwiMTUyOTE3NzY3ODY3NDc0MDc3MjA1NTMzMTI3ODY1MTQxNjY3NzY0NTY4ODM3NDI4NjEwODk5MDQ3NzE5NDAxODg4NzgxNzYyNDg2MTYiLCIxNDczMjI2OTMxNDgxMTQ3OTQxOTgyMzE2NTY5MzcxMTM3MDU0OTA5NTI4NTI0OTU5NzA0ODcyNTg1MDk1ODcwOTYwNzYwMjk5MTM5MiJd
```

-   NOTE: the post id should be provided in -pid (we use transaction hash of `publishPost` as the post id)
-   After the proof is submitted, a proof index will be printed, then other users can upvote or downvote this epoch key with the proof index.

```
Verify reputation proof of epoch key 1920144953 with 3 reputation spent in transaction and minimum reputation 15 succeed
Epoch key of epoch 1: 1920144953
Transaction hash: 0x5efb0daa31ce60fb5d690786d227c74ebfb6e33a0768f6b13d27e3c82d28932e
Proof index: 4
```

-   The reputation proof can also be verified by the `verifyReputationProof` command

#### 10. Second user upvotes to epoch key

**10.1. Sign up the second user to perform upvote**

```
npx ts-node cli/index.ts genUnirepIdentity
npx ts-node cli/index.ts userSignup \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2 \
    -c Unirep.identityCommitment.MjE2N2M0N2RiODEwZjRkMTBkZmUyMDc5OTBmYjdlZGI4M2ZjN2UxNzk3NmI2YjI0MzNmNjU5Y2QyYTAwYzc4Yg \
    -d 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563
```

**10.2. Second user generates a reputation proof to vote**

```
npx ts-node cli/index.ts genReputationProof \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2 \
    -id Unirep.identity.WyI4MTE5MzQ5MTFkNzczOTM2ODAyY2RlNjY0YWRjNGJhMWM3Zjk0MmMyMzZmYjRkNTRkYTE3MmFkNTdjYTYyMjE1IiwiZDIxYTU1NWJlMGQwOWFiMjJmOWU0ZGRkMGU3ZDllNzhkYzJmNGMzMWEzNjE5NjAwMGE4ZDU4YzE0NTBkMjgiLCIyN2JlY2I1YWE4YTI4NjM2ZjA0YTE4MDI1ZWE2MWUzZDI5N2YzNWNhYzQ2OGJhZTM5ZTUxYWQ0YmIyZDg5YiJd \
    -n 0 \
    -act vote \
    -v 3
```

-   NOTE: If user chooses the action `vote`, a vote value `-v` should be given
-   base64url encoded reputation proof and public signals will be printed, For example,

```
Epoch key of epoch 1 and nonce 0: 1628983718
Unirep.reputation.proof.WyI0NjU3NTczNTAxNDM1MjE1NjY1NDI5NzMzNDA0MjEwMTY4NDExMDc4NDg2MzE2NzcwMzkzMzQyMTQ4NzUwNTAzOTUxOTA0OTc3OTg0IiwiMTc4MTM5OTE2NjAzNzg3MzI5MjA4Njc5MzIyODUxMTA3ODkzNjYxMzU2MDgwNDEwMzY0ODEyNTc3MzkyNjkxNDI0NDYwMzYwODIiLCIxMzU2ODM1MTQ3Njg5ODcxNDEzNTc5MTk2OTQ0MDYwMzE4MjU0MDQ3NDExNzYxOTEzOTEyNjA0Njk2MDUwNDA1NDI5ODA0OTY1MTk5NSIsIjIwMTQ5ODQxMDAzNTg3OTExNTA2OTIwMTY5NDYxMDQ5MDIxMTAxNzMwNjU1OTgyODI4MzcwODk4ODYwODExMzE4OTI5NzQ0OTE2NTQ3IiwiMzIzNjUyNjU4NzA4NTM5ODUxMzg1NjQ5MzAwNjIxNzU3ODIzNzY4MDAxOTk1NTUzNTU2Mjk4ODMwOTY5Mzc3MjAzMTcwOTQ0MTYwMiIsIjEyOTk3NjM5NTA0MTM5MTEzNDYwMzczNzM4ODY5NTc0NDA3MjA4MjgzNzIyMDY0MDIyNjYzODQxNTg5NzAzMTk4MTgxNjYwNzU4MDQ4IiwiNDE3OTQ2MzA2MjE1NTY2ODcyNzMzMTI1MjE0NjE0MDIyNDA1NzA4NzcyODEzNTQzNjU3NjczODU4MjUwMDU1NjAzOTc2NTY0MjQ4MCIsIjM1NjAxNzc1NTM3OTIzNjMyMDgyNTYyMjIyNzQ2NDk1NTE0MjQzMzUwNjkyODQ4OTgyNTAyNTczMjg0MzM5NDA0MzkzNzY0NTM4NDUiXQ
Unirep.reputation.publicSignals.WyI1Mzg1ODk3OTc1OTMyOTYxMjY3ODg3MDM1MDY5OTQxMzY4NzQzOTk0NjA1NDA3OTcwMDE3MDA1MjY2NTE2MjY2NzY5ODM2NjAyMDcxIiwiODc1ODQ2NTg5ODAzNzY4MDUyNjE1NTgyNjkzMjQwMTgwMjQ5ODk1ODkyNjk5MDE3NDU2NTU2NjI0NjE4MDA4Nzc0NzUzMjQwNTAwMSIsIjEzOTg4NzA3MjQ5MzQ4NjY1NjA5MzA3MzY3ODg0NTU3Mjg1NDQ5OTY3MTM4NTc0MjExNDcyMzM2MjU5MjcwNjIwNTU5MjQxMjk3NjY0IiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjEiLCIxNjI4OTgzNzE4IiwiNjQzMzgwMjQwMjQ5NDA0MDg3Nzk1MzE1OTM3NjUxNjczNDY5NzIyMjU4MzI3MjI3NzU0NDM5MTY5NzI3MTkxNzYwNDU2MjIxNzgzNCIsIjEiLCIzIiwiMCIsIjAiLCIwIl0
```

**10.3 Second user submit upvote to the first user with the reputation proof**

```
npx ts-node cli/index.ts vote \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2  \
    -d 0x405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace  \
    -epk 1920144953  \
    -i 3  \
    -uv 3 \
    -p Unirep.reputation.publicSignals.WyI1Mzg1ODk3OTc1OTMyOTYxMjY3ODg3MDM1MDY5OTQxMzY4NzQzOTk0NjA1NDA3OTcwMDE3MDA1MjY2NTE2MjY2NzY5ODM2NjAyMDcxIiwiODc1ODQ2NTg5ODAzNzY4MDUyNjE1NTgyNjkzMjQwMTgwMjQ5ODk1ODkyNjk5MDE3NDU2NTU2NjI0NjE4MDA4Nzc0NzUzMjQwNTAwMSIsIjEzOTg4NzA3MjQ5MzQ4NjY1NjA5MzA3MzY3ODg0NTU3Mjg1NDQ5OTY3MTM4NTc0MjExNDcyMzM2MjU5MjcwNjIwNTU5MjQxMjk3NjY0IiwiMCIsIjAiLCIwIiwiMCIsIjAiLCIwIiwiMCIsIjEiLCIxNjI4OTgzNzE4IiwiNjQzMzgwMjQwMjQ5NDA0MDg3Nzk1MzE1OTM3NjUxNjczNDY5NzIyMjU4MzI3MjI3NzU0NDM5MTY5NzI3MTkxNzYwNDU2MjIxNzgzNCIsIjEiLCIzIiwiMCIsIjAiLCIwIl0 \
    -pf Unirep.reputation.proof.WyI0NjU3NTczNTAxNDM1MjE1NjY1NDI5NzMzNDA0MjEwMTY4NDExMDc4NDg2MzE2NzcwMzkzMzQyMTQ4NzUwNTAzOTUxOTA0OTc3OTg0IiwiMTc4MTM5OTE2NjAzNzg3MzI5MjA4Njc5MzIyODUxMTA3ODkzNjYxMzU2MDgwNDEwMzY0ODEyNTc3MzkyNjkxNDI0NDYwMzYwODIiLCIxMzU2ODM1MTQ3Njg5ODcxNDEzNTc5MTk2OTQ0MDYwMzE4MjU0MDQ3NDExNzYxOTEzOTEyNjA0Njk2MDUwNDA1NDI5ODA0OTY1MTk5NSIsIjIwMTQ5ODQxMDAzNTg3OTExNTA2OTIwMTY5NDYxMDQ5MDIxMTAxNzMwNjU1OTgyODI4MzcwODk4ODYwODExMzE4OTI5NzQ0OTE2NTQ3IiwiMzIzNjUyNjU4NzA4NTM5ODUxMzg1NjQ5MzAwNjIxNzU3ODIzNzY4MDAxOTk1NTUzNTU2Mjk4ODMwOTY5Mzc3MjAzMTcwOTQ0MTYwMiIsIjEyOTk3NjM5NTA0MTM5MTEzNDYwMzczNzM4ODY5NTc0NDA3MjA4MjgzNzIyMDY0MDIyNjYzODQxNTg5NzAzMTk4MTgxNjYwNzU4MDQ4IiwiNDE3OTQ2MzA2MjE1NTY2ODcyNzMzMTI1MjE0NjE0MDIyNDA1NzA4NzcyODEzNTQzNjU3NjczODU4MjUwMDU1NjAzOTc2NTY0MjQ4MCIsIjM1NjAxNzc1NTM3OTIzNjMyMDgyNTYyMjIyNzQ2NDk1NTE0MjQzMzUwNjkyODQ4OTgyNTAyNTczMjg0MzM5NDA0MzkzNzY0NTM4NDUiXQ
```

-   NOTE: `-epk` is the first user's epoch key and `-i` is the proof index of the epoch key. User should choose either upvote with the flag `-uv` and downvote with the flag `-dv` and should provide the vote value.
-   Then the upvote result will be printed

```
Verify reputation proof of epoch key 1628983718 with 3 reputation spent in transaction and minimum reputation 0 succeed
Attesting to epoch key 1920144953 with pos rep 3, neg rep 0
Epoch key of epoch 1: 1628983718
Transaction hash: 0x2834a414346e6958660a8b28dba38f239393cfae79b21734299a5d7ddb628482
Proof index: 6
```

#### 11. User can generate the airdrop proof

```
npx ts-node cli/index.ts genAirdropProof \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2  \
    -id Unirep.identity.WyI5M2QzYjcyZjQxMjI4M2U0OTAzNDhhZDZiN2E4ZWEyMjdjNzM2OWIzMzYxZWZmNGJhOTViNjVkMWVkMTI2NDVjIiwiZmZjNTdjZGIyNzU1NjhiOWIzYTIyODBmMWNlN2JiNmM2NDE3MzM3ZTAyMzZjZGY0YjM5MmY0ZTNlOWUyYjciLCI0M2M1M2IyZWI4N2IyY2Y2ZjdhODA3YjZmM2RiODQ0NmNkMGU3NzlhZmE3MDUyNTI4ODRiYjZlMDQzMjcwMiJd
```

-   If the user signs up through Unirep Social, the user will get a sign up flag in Unirep Social
-   Then the user can generate a `UserSignUpProof` to prove the membership of Unirep Social. The proof also generates the epoch key to get airdrop.
-   base64url encoded sign up proof and public signals will be printed, For example,

```
Epoch key of epoch 1: 1920144953
Unirep.signUp.proof.WyI2NjM1MDYyNDY5MTQyNDU0MDk3MDk4ODM2NTY3MDYwOTc5MTU4ODA4OTI4NTE2ODEzNjY5OTI2MDI0ODM5MDQ0NzEyNTQzMjgyNzQ4IiwiMTMzNzQ4NzAzMDIyNTQxOTg0NjQyMjQ4MDMyMTkyNDI3Njk1NDI0NjcwODcyOTg5MTcxNjQzMDgyODU0NDI4NDU0NDYzMzc4OTkwMjMiLCI0NDQzMzE3NDQwNzEyNzc1MzgwMTkzOTI0Njk0ODgzMzE3Mzc5MTg0NDAxNTYyNDIxMzkwOTExOTI5MzI4NzU3MzExMzY0NDY2MTczIiwiMTk0NTIyMDI1NzY5ODkyNzY1NjU4MzMxNTg0MTE4Nzc3NjQ2NzQwNzE0NjQzMTkxOTQ1MTk2MjU2NjQxMTUwODE1ODI0NjA5NzI0MCIsIjIxNzQ5NTIwMDY0MTk5NzcxMTQ1ODI0NDQ0NjQ3MDQ2MjEwNDE3NDQyMzE3ODU3Njg1NjEwODQ5MjIxMTY4MTE2MjMxMTc2NDM1MzMiLCI5NTY2OTgwMzI0NTczMzg2NzI1NTI2MDAxNzA0NDAxNjg5NTQ5OTY1MDAzOTY2OTE4MzkzMTU1NDM1NjIyODM3NjUyMjM3MDA2NDExIiwiNTg3NjU4NzQxMjUyOTc1NzgxOTU2MTI5NTgwODY5MTU0NTg1NzAzMTgzNzg0MTQ4NTQyMDY4MTY4OTgyODQzODg2NDcxMDc2MTQ4IiwiMjE3OTMzMDY5OTM3MjMxNDk4MTk0ODE1NzE4MDg3OTY0MTI2NTQ2NDQwNjIwNzUyOTk0NzMxNjg1MzAyNjYxNTg1NTI3NzQzNjE0ODEiXQ
Unirep.signUp.publicSignals.WyIxIiwiMTkyMDE0NDk1MyIsIjY0MzM4MDI0MDI0OTQwNDA4Nzc5NTMxNTkzNzY1MTY3MzQ2OTcyMjI1ODMyNzIyNzc1NDQzOTE2OTcyNzE5MTc2MDQ1NjIyMTc4MzQiLCIxIl0
```

#### 12. The Unirep Social can airdrop the user with a `signUpProof`

```
npx ts-node cli/index.ts giveAirdrop \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2  \
    -d 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563 \
    -p Unirep.signUp.publicSignals.WyIxIiwiMTkyMDE0NDk1MyIsIjY0MzM4MDI0MDI0OTQwNDA4Nzc5NTMxNTkzNzY1MTY3MzQ2OTcyMjI1ODMyNzIyNzc1NDQzOTE2OTcyNzE5MTc2MDQ1NjIyMTc4MzQiLCIxIl0  \
    -pf Unirep.signUp.proof.WyI2NjM1MDYyNDY5MTQyNDU0MDk3MDk4ODM2NTY3MDYwOTc5MTU4ODA4OTI4NTE2ODEzNjY5OTI2MDI0ODM5MDQ0NzEyNTQzMjgyNzQ4IiwiMTMzNzQ4NzAzMDIyNTQxOTg0NjQyMjQ4MDMyMTkyNDI3Njk1NDI0NjcwODcyOTg5MTcxNjQzMDgyODU0NDI4NDU0NDYzMzc4OTkwMjMiLCI0NDQzMzE3NDQwNzEyNzc1MzgwMTkzOTI0Njk0ODgzMzE3Mzc5MTg0NDAxNTYyNDIxMzkwOTExOTI5MzI4NzU3MzExMzY0NDY2MTczIiwiMTk0NTIyMDI1NzY5ODkyNzY1NjU4MzMxNTg0MTE4Nzc3NjQ2NzQwNzE0NjQzMTkxOTQ1MTk2MjU2NjQxMTUwODE1ODI0NjA5NzI0MCIsIjIxNzQ5NTIwMDY0MTk5NzcxMTQ1ODI0NDQ0NjQ3MDQ2MjEwNDE3NDQyMzE3ODU3Njg1NjEwODQ5MjIxMTY4MTE2MjMxMTc2NDM1MzMiLCI5NTY2OTgwMzI0NTczMzg2NzI1NTI2MDAxNzA0NDAxNjg5NTQ5OTY1MDAzOTY2OTE4MzkzMTU1NDM1NjIyODM3NjUyMjM3MDA2NDExIiwiNTg3NjU4NzQxMjUyOTc1NzgxOTU2MTI5NTgwODY5MTU0NTg1NzAzMTgzNzg0MTQ4NTQyMDY4MTY4OTgyODQzODg2NDcxMDc2MTQ4IiwiMjE3OTMzMDY5OTM3MjMxNDk4MTk0ODE1NzE4MDg3OTY0MTI2NTQ2NDQwNjIwNzUyOTk0NzMxNjg1MzAyNjYxNTg1NTI3NzQzNjE0ODEiXQ
```

#### 13. Epoch transition

```
npx ts-node cli/index.ts epochTransition \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2  \
    -d 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563  \
    -t
```

-   NOTE: `-t` indicates it's testing environment so it will fast forward to the end of epoch

#### 14. User state transition

```
npx ts-node cli/index.ts userStateTransition \
    -x 0x4D15B2E51aa7d1b4fcBcd702d2AdBc94D85748e2  \
    -d 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563  \
    -id Unirep.identity.WyI5M2QzYjcyZjQxMjI4M2U0OTAzNDhhZDZiN2E4ZWEyMjdjNzM2OWIzMzYxZWZmNGJhOTViNjVkMWVkMTI2NDVjIiwiZmZjNTdjZGIyNzU1NjhiOWIzYTIyODBmMWNlN2JiNmM2NDE3MzM3ZTAyMzZjZGY0YjM5MmY0ZTNlOWUyYjciLCI0M2M1M2IyZWI4N2IyY2Y2ZjdhODA3YjZmM2RiODQ0NmNkMGU3NzlhZmE3MDUyNTI4ODRiYjZlMDQzMjcwMiJd
```

-   After finish user state transition, the user can collect all of the reputation from the previous epoch
