import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import { useState } from "react";

interface PropertySearchPanelProps {
  onSortChange: (sortBy: string) => void;
  onFilterChange: (filters: any) => void;
  totalProperties?: number;
}

export default function PropertySearchPanel({
  onSortChange,
  onFilterChange,
  totalProperties = 0,
}: PropertySearchPanelProps) {
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedContract, setSelectedContract] = useState<string | null>(null);

  const sortOptions = [
    { key: "price_desc", label: "Azalan Fiyat" },
    { key: "price_asc", label: "Artan Fiyat" },
    { key: "newest", label: "Yeniden Eskiye" },
    { key: "oldest", label: "Eskiden Yeniye" },
  ];

  const contractOptions = [
    { key: "1", label: "Kiralık" },
    { key: "2", label: "Satılık" },
  ];

  const handleSortChange = (key: string) => {
    setSelectedSort(key);
    onSortChange(key);
  };

  const handleContractChange = (key: string) => {
    setSelectedContract(key === selectedContract ? null : key);
    onFilterChange({ contract: key === selectedContract ? null : key });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {contractOptions.map((option) => (
          <Chip
            key={option.key}
            variant={selectedContract === option.key ? "solid" : "bordered"}
            color={selectedContract === option.key ? "primary" : "default"}
            onClick={() => handleContractChange(option.key)}
            className="cursor-pointer"
          >
            {option.label}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => (
          <Chip
            key={option.key}
            variant={selectedSort === option.key ? "solid" : "bordered"}
            color={selectedSort === option.key ? "primary" : "default"}
            onClick={() => handleSortChange(option.key)}
            className="cursor-pointer"
          >
            {option.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
