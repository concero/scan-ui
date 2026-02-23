import { Dropdown } from '@/components/common/Dropdown/Dropdown';
import { useFilterTrigger } from './useFilterTrigger';
import { ReactNode } from 'react';
import { HStack } from '../../Stack';

export interface FilterDropdownProps {
  children: ReactNode;
  title: string;
  isApplied: boolean; 
}

export const FilterDropdown = ({ children, title, isApplied }: FilterDropdownProps) => {
  const { isOpen, open, close, triggerText, icon } = useFilterTrigger(title, isApplied);

  return (
    <Dropdown
      open={isOpen}
      onOpenChange={(openArg) => {
        if (openArg) open();
        else close();
      }}
      trigger={
        <HStack gap="space_0_5">
          {triggerText}
          {icon}
        </HStack>
      }
    >
      {children}
    </Dropdown>
  );
};