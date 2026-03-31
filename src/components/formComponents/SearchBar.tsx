import { Input } from "antd";
import { useEffect, useState } from "react";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  const [localValue, setLocalValue] = useState(searchTerm);
  
  useEffect(() => {
    setLocalValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localValue, setSearchTerm]);

  return (
    <Input
      placeholder="🔍 Search articles..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  );
}
