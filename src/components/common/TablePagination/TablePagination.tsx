import type { FC, ReactElement } from 'react';
import { IconButton } from '@concero/ui-kit';
import { ArrowLeftIcon, ArrowRightIcon } from '@/assets';
import { useIsMobile } from '@/hooks';
import { getPaginationPageList } from '@/utils/pagination';
import './styles.pcss';

type TablePaginationProps = {
    current: number;
    total: number;
    onChange: (page: number) => void;
};

const PaginationButton: FC<{ page: number; active: boolean; onClick: () => void }> = ({ page, active, onClick }) => (
    <IconButton
        size="m"
        variant={active ? 'secondary_color' : 'tetrary'}
        aria-current={active ? 'page' : undefined}
        onClick={onClick}
        className={`pagination_button ${active ? 'active' : ''}`}
    >
        {page}
    </IconButton>
);

const EllipsisButton: FC<{ key: string | number }> = ({ key }) => (
    <IconButton key={key} size="m" variant="secondary" disabled className="pagination_ellipsis">
        &hellip;
    </IconButton>
);

const MobilePagination: FC<{ current: number; total: number; onChange: (page: number) => void }> = ({
    current,
    total,
    onChange,
}) => (
    <div className="table_pagination_mobile">
        <IconButton
            size="m"
            variant="secondary"
            disabled={current === 1}
            onClick={() => onChange(current - 1)}
            aria-label="Previous page"
        >
            <ArrowLeftIcon />
        </IconButton>
        <span className="pagination_mobile_status">
            Page <span className="pagination_mobile_status_value">{current}</span> of{' '}
            <span className="pagination_mobile_status_value">{total}</span>
        </span>
        <IconButton
            size="m"
            variant="secondary"
            disabled={current === total}
            onClick={() => onChange(current + 1)}
            aria-label="Next page"
        >
            <ArrowRightIcon />
        </IconButton>
    </div>
);

const DesktopPagination: FC<{ current: number; total: number; onChange: (page: number) => void }> = ({
    current,
    total,
    onChange,
}) => {
    const pages = getPaginationPageList(current, total);

    return (
        <div className="table_pagination">
            <div className="table_pagination_controls">
                <IconButton
                    size="m"
                    variant="secondary"
                    disabled={current === 1}
                    onClick={() => onChange(current - 1)}
                    aria-label="Previous page"
                >
                    <ArrowLeftIcon />
                </IconButton>
                <div className="pagination_buttons">
                    {pages.map((page, idx) =>
                        page === '...' ? (
                            <EllipsisButton key={`ellipsis-${idx}`} />
                        ) : (
                            <PaginationButton
                                key={page}
                                page={page as number}
                                active={page === current}
                                onClick={() => onChange(page as number)}
                            />
                        )
                    )}
                </div>
                <IconButton
                    size="m"
                    variant="secondary"
                    disabled={current === total}
                    onClick={() => onChange(current + 1)}
                    aria-label="Next page"
                >
                    <ArrowRightIcon />
                </IconButton>
            </div>
        </div>
    );
};

export const TablePagination: FC<TablePaginationProps> = ({ current, total, onChange }): ReactElement | null => {
    if (total <= 1) return null;

    const isMobile = useIsMobile();

    switch (true) {
        case isMobile:
            return <MobilePagination current={current} total={total} onChange={onChange} />;
        case !isMobile:
            return <DesktopPagination current={current} total={total} onChange={onChange} />;
        default:
            return null;
    }
};
