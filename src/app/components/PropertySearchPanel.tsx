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
}

export default function PropertySearchPanel({
  onSortChange,
  onFilterChange,
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
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Filtreler</h3>
          <div className="flex gap-2">
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
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">
              {sortOptions.find((option) => option.key === selectedSort)
                ?.label || "Sırala"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Sıralama seçenekleri"
            onAction={(key) => handleSortChange(key as string)}
          >
            {sortOptions.map((option) => (
              <DropdownItem key={option.key}>{option.label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
