import type { ReactElement } from "react"
import { Button } from "@concero/ui-kit"
import './style.pcss'

export const Header = (): ReactElement => {
    return (
        <header className="header">
            <div className="header_logo">
                <img src="/Concero.svg" alt="Concero" />
            </div>
            <div className="header_actions">
                <span className="header_divider"/>
                <Button variant="secondary" size="m">Contact Support</Button>
            </div>
        </header>
    )
}