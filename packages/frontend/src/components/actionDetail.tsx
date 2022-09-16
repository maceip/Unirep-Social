import { useState } from 'react'
import { InfoType } from '../constants'
import HelpWidget from './helpWidget'
import { shortenEpochKey } from '../utils'

type Props = {
    showBorder: boolean
    showHelp: boolean
    showRep: boolean
    maxRep: number
    defaultRep: number
    hasRep: number
    showoffRep: number
    setShowoffRep: (showoffRep: number) => void
    allEpks: string[]
    useSubsidy: boolean
    chooseToUseSubsidy: () => void
    chooseToUsePersona: () => void
    epkNonce: number
    setEpkNonce: (epkNonce: number) => void
}

const ActionDetail = ({
    showBorder,
    showHelp,
    showRep,
    maxRep,
    defaultRep,
    hasRep,
    showoffRep,
    setShowoffRep,
    allEpks,
    useSubsidy,
    chooseToUseSubsidy,
    chooseToUsePersona,
    epkNonce,
    setEpkNonce,
}: Props) => {
    const onRepChange = (event: any) => {
        setShowoffRep(+event.target.value)
    }

    return (
        <div className="action-detail">
            <div className="choose-from">
                <div className="choices">
                    <div
                        className={useSubsidy ? 'choice chosen' : 'choice'}
                        onClick={chooseToUseSubsidy}
                    >
                        Rep-Handout
                    </div>
                    <div
                        className={useSubsidy ? 'choice' : 'choice chosen'}
                        onClick={chooseToUsePersona}
                    >
                        Personas
                    </div>
                </div>
                {showHelp && (
                    <div className="help">
                        <HelpWidget type={InfoType.subsidy} />
                    </div>
                )}
            </div>
            {hasRep > defaultRep ? (
                <div
                    className={
                        showBorder ? 'info-detail info-border' : 'info-detail'
                    }
                >
                    {useSubsidy ? (
                        <div className="epk chosen">
                            <div className="rep">{hasRep}</div>
                            <span className="interline"></span>
                            {allEpks[0]}
                        </div>
                    ) : (
                        <>
                            {allEpks.map((epk, i) => (
                                <div
                                    className={
                                        i === epkNonce ? 'epk chosen' : 'epk'
                                    }
                                    onClick={() => setEpkNonce(i)}
                                    key={epk}
                                >
                                    {shortenEpochKey(epk)}
                                </div>
                            ))}
                        </>
                    )}
                    {showRep && (
                        <div
                            className="rep-chooser"
                            style={{
                                display: hasRep > defaultRep ? 'flex' : 'none',
                            }}
                        >
                            <input
                                type="range"
                                min={0}
                                max={maxRep}
                                value={showoffRep}
                                onChange={onRepChange}
                            />
                            <input
                                type="text"
                                value={showoffRep}
                                onChange={onRepChange}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className={
                        showBorder ? 'info-detail info-border' : 'info-detail'
                    }
                >
                    {useSubsidy
                        ? 'You have used all the Rep-Handout ;)'
                        : 'You don’t have any Rep to use persona yet....'}
                </div>
            )}
        </div>
    )
}

export default ActionDetail
