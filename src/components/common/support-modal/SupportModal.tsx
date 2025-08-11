import { ReactElement } from "react";
import { createPortal } from "react-dom";
import "./styles.pcss"

type SupportModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const SupportModal = ({ isOpen, onClose }: SupportModalProps): ReactElement | null => {
    if (!isOpen) return null;

    return createPortal(
        <div className="support_modal_overlay">

        </div>,
        document.body
    );
}