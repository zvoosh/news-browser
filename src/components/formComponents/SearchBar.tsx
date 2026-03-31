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
      if (localValue !== searchTerm) {
        setSearchTerm(localValue);
      }
    }, 675);

    return () => {
      clearTimeout(handler);
    };
  }, [localValue, searchTerm, setSearchTerm]);

  return (
    <Input
      placeholder="🔍 Search articles..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  );
}
