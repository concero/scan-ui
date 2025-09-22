import type { ReactElement } from 'react'
import { From } from './From'
import { To } from './To'
import './styles.pcss'

export const Details = (): ReactElement => (
    <div className="details">
        <From />
        <To />
    </div>
) 