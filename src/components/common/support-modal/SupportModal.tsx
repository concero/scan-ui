import { ReactElement } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@concero/ui-kit";
import { CloseIcon, CopyIcon } from "@/assets";
import { Button } from "@concero/ui-kit";
import "./styles.pcss"

type SupportModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const SupportModal = ({ isOpen, onClose }: SupportModalProps): ReactElement | null => {
    if (!isOpen) return null;

    return createPortal(
        <div className="support_modal_overlay">
            <div className="support_modal">
                <div className="support_modal_header">
                    <span className="support_modal_title">Contact Support</span>
                    <IconButton variant="secondary" size="m" onClick={onClose}><CloseIcon/></IconButton>
                </div>
                <span className="support_modal_description">
                    We apologise that you had issues withs your transaction. We will do our best to resolve the issue.
                </span>
                <div className="support_modal_option">
                    <span className="support_modal_option_text">1. Copy debug info</span>
                    <Button variant="secondary" size="l" isFull leftIcon={<CopyIcon/>} onClick={() => {}}>Copy debug info</Button>
                </div>
                <div className="support_modal_option">
                     <span className="support_modal_option_text">2. Drop us a message</span>
                     <Button variant="secondary" size="l" isFull onClick={() => {}}>Open Discord</Button>
                </div>
            </div>
        </div>,
        document.body
    );
}