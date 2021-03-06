import React, { memo } from 'react'

interface IProps {
    IF: boolean
    children: React.ReactNode
}

const SHOW = ({ children, IF }: IProps) => {
    if (IF) {
        return <>{children}</>
    }

    return <></>
}

export default memo(SHOW)
