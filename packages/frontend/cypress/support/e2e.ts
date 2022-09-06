// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import { ethers } from 'ethers'

// import unirep social json abi
import UnirepSocial from '@unirep-social/core/artifacts/contracts/UnirepSocial.sol/UnirepSocial.json'
import { deployUnirep } from '@unirep/contracts/deploy'
import { deployUnirepSocial } from '@unirep-social/core'

const GANACHE_URL = 'http://localhost:18545'
const FUNDED_PRIVATE_KEY =
    '0x0000000000000000000000000000000000000000000000000000000000000001'

async function waitForGanache() {
    for (let x = 0; x < 100; x++) {
        await new Promise((r) => setTimeout(r, 1000))
        try {
            const provider = new ethers.providers.JsonRpcProvider(GANACHE_URL)
            await provider.getNetwork()
            break
        } catch (_) {}
    }
}

async function deploy(wallet: ethers.Wallet, overrides = {}) {
    console.log('deploying unirep in e2e')
    const provider = new ethers.providers.JsonRpcProvider(GANACHE_URL)
    const unirep = await deployUnirep(wallet)
    const postReputation = 5
    const commentReputation = 3
    const airdropReputation = 30
    const unirepSocial = await deployUnirepSocial(wallet, unirep.address, {
        postReputation,
        commentReputation,
        airdropReputation,
        ...overrides,
    })
    await unirepSocial.deployed()
    return { unirep, unirepSocial, provider }
}

export async function startServer(contractOverrides = {}) {
    console.log('start server function in e2e')
    await waitForGanache()

    const provider = new ethers.providers.JsonRpcProvider(GANACHE_URL)

    const wallet = new ethers.Wallet(FUNDED_PRIVATE_KEY, provider)

    const data = await deploy(wallet, contractOverrides)
    const { unirep, unirepSocial } = data

    // Object.assign(process.env, {
    //     UNIREP: unirep.address,
    //     UNIREP_SOCIAL: unirepSocial.address,
    //     DEPLOYER_PRIV_KEY: wallet.privateKey,
    //     DEFAULT_ETH_PROVIDER_URL: GANACHE_URL,
    //     ADMIN_SESSION_CODE: 'ffff',
    //     ...process.env,
    // })
    // console.log('This is process env:', process.env)

    return {
        unirepSocialAddress: unirepSocial.address,
        unirepAddress: unirep.address,
        unirepSocialABI: UnirepSocial.abi,
        fundedKey: FUNDED_PRIVATE_KEY,
        ganacheUrl: GANACHE_URL,
    }
}