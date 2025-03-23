
// src/components/products/SortDropdown.tsx
import React from 'react';
import { SortOption } from '../../types/Product';
import Dropdown from '../common/Dropdown';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const options = [
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'count-asc', label: 'Count: Low to High' },
    { value: 'count-desc', label: 'Count: High to Low' },
  ];

  return (
    <div className="w-48">
      <Dropdown
        options={options}
        value={value}
        onChange={(value) => onChange(value as SortOption)}
        label="Sort by"
      />
    </div>
  );
};

export default SortDropdown;
