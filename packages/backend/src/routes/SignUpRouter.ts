import { Express } from 'express'
import catchError from '../catchError'
import TransactionManager from '../daemons/TransactionManager'
import { verifySignUpProof } from '../utils'

export default (app: Express) => {
    app.post('/api/signup', catchError(signup))
}

async function signup(req, res) {
    const { publicSignals, proof } = req.body
    const error = await verifySignUpProof(req, publicSignals, proof)
    if (error) {
        res.json({
            error,
        })
        return
    }

    const calldata = req.unirepSocial.interface.encodeFunctionData(
        'userSignUp',
        [publicSignals, proof]
    )
    const hash = await TransactionManager.queueTransaction(
        req.unirepSocial.address,
        calldata
    )

    const epoch = await req.unirep.attesterCurrentEpoch(
        req.unirepSocial.address
    )
    console.log('transaction: ' + hash + ', sign up epoch: ' + epoch.toString())

    res.json({
        transaction: hash,
        epoch: epoch,
    })
}
