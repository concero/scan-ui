import type { ReactElement } from 'react'
import { ButtonGroup } from '@/components/common'
import { truncate } from '@/utils/format'
import './styles.pcss'

type ContentProps = {
    type: string;
    value?: string
    showActions?: boolean
}

export const PageHeading = ({ type, value, showActions = false }: ContentProps): ReactElement => {
    return (
        <div className="page_heading">
            <div className="page_heading_description">
                <div className="page_heading_info">
                    <div className="page_heading_icon">
                        {type}
                    </div>
                </div>
                <div className="page_heading_content">
                    <span className="page_heading_title">{truncate(value, 5, 5)}</span>
                    <span className="page_heading_subtitle">{value}</span>
                </div>
            </div>
            {showActions && <ButtonGroup labels={['Outgoing', 'Incoming']} />}
        </div>
    )
}
