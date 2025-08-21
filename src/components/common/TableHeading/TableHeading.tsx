import type { ReactElement, FC } from 'react';
import './styles.pcss';

type TableHeadingProps = {
  readonly headers: string[];
};

export const TableHeading: FC<TableHeadingProps> = ({ headers }): ReactElement => (
  <thead className="table_heading">
    <tr className="table_heading_container">
      {headers.map((header) => (
        <th key={header} className="table_head">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);
