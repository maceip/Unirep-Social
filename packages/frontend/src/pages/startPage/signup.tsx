import { useState, useContext } from 'react'

import PostContext from '../../context/Post'
import UserContext from '../../context/User'

import CustomBox, { BoxStyle, ButtonAlign } from '../../components/customBox'

type Props = {
    onboarded: () => void
    getStarted: () => void
}

const Signup = ({ onboarded, getStarted }: Props) => {
    const userContext = useContext(UserContext)
    const postContext = useContext(PostContext)

    const [step, setStep] = useState<number>(0)
    const [pwd, setPwd] = useState<string>('')
    const [confirmPwd, setConfirmPwd] = useState<string>('')

    const onPwdChange = (event: any) => {
        setPwd(event.target.value)
        console.log('pwd:', event.target.value)
    }

    const onConfirmPwdChange = (event: any) => {
        setConfirmPwd(event.target.value)
        console.log('confirm pwd:', event.target.value)
    }

    const download = () => {}

    const copy = () => {
        setStep(step + 1)
    }

    const back = () => {
        if (step > 0) {
            setStep(step - 1)
        } else {
            getStarted()
        }
    }

    return (
        <CustomBox
            bg="bg-signup"
            boxStyle={BoxStyle.light}
            hasBack={true}
            backFunction={back}
            hasClose={false}
            stepNum={4}
            currentStep={step}
        >
            {step === 0 ? (
                <>
                    <h2 className="title">Sign up</h2>
                    <p>
                        UniRep Social uses Interep for authentication. You can
                        sign up easily while maintaining your anonymity.
                    </p>
                    <div className="gap"></div>
                    <div className="box-buttons">
                        <button
                            className="button-light"
                            onClick={() => setStep(step + 1)}
                        >
                            Twitter{' '}
                            <img
                                src={require('../../../public/images/twitter.svg')}
                            />
                        </button>
                        <div className="gap"></div>
                        <button
                            className="button-light"
                            onClick={() => setStep(step + 1)}
                        >
                            Github{' '}
                            <img
                                src={require('../../../public/images/github.svg')}
                            />
                        </button>
                        <div className="gap"></div>
                        <button
                            className="button-light"
                            onClick={() => setStep(step + 1)}
                        >
                            Reddit{' '}
                            <img
                                src={require('../../../public/images/reddit.svg')}
                            />
                        </button>
                    </div>
                    <div className="gap"></div>
                    <p>
                        We don't store your user information, we use it to
                        generate a proof that you have an identity.
                    </p>
                </>
            ) : step === 1 ? (
                <>
                    <div className="title">Password for encryption</div>
                    <input placeholder="Password" onChange={onPwdChange} />
                    <div className="gap"></div>
                    <input
                        placeholder="Confirm password"
                        onChange={onConfirmPwdChange}
                    />
                    <div className="gap"></div>
                    <p>
                        Keep in mind, this password is <strong>NOT</strong>{' '}
                        recoverable. If you lost one day, we won’t be able to
                        help you.
                    </p>
                    <div className="box-buttons buttons-horizontal buttons-bottom">
                        <button
                            className="button-light"
                            onClick={() => setStep(step + 1)}
                        >
                            Skip this
                        </button>
                        <button
                            className="button-dark"
                            onClick={() => setStep(step + 1)}
                        >
                            Encrypt it
                        </button>
                    </div>
                </>
            ) : step === 2 ? (
                <>
                    <div className="title">The most important, private key</div>
                    <p>
                        UniRep Social uses a zero-knowledge gadget called{' '}
                        <strong>Semaphore</strong> to generates a secure private
                        key. This is the only key for you to access your UniRep
                        Social and Rep points.{' '}
                    </p>
                    <textarea />
                    <p>
                        <strong>
                            ⚠️​ It’s very important for you to store it
                            safely.⚠️​{' '}
                        </strong>
                        <br />
                        We can not recover it for you if it’s lost. ️​
                    </p>
                    <div className="box-buttons buttons-horizontal buttons-bottom">
                        <button className="button-light" onClick={download}>
                            Download
                        </button>
                        <button className="button-dark" onClick={copy}>
                            Copy
                        </button>
                    </div>
                </>
            ) : step === 3 ? (
                <>
                    <div className="title">Have a practice</div>
                    <p>
                        The private key you just copied is used for signing in
                        to the UniRep social, let’s give a try.
                    </p>
                    <p>Please paste the private key below ️​</p>
                    <textarea />
                    <div className="gap"></div>
                    <div className="gap"></div>
                    <div className="box-buttons buttons-bottom">
                        <button className="button-dark" onClick={onboarded}>
                            Submit
                        </button>
                    </div>
                </>
            ) : null}
        </CustomBox>
    )
}

export default Signup
