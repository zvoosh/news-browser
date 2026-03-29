import { useState, useEffect } from "react";
import { Input } from "antd";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (search: string) => void;
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 400);

    return () => clearTimeout(timeout);
  }, [value, onSearch]);

  return (
    <Input
      placeholder="🔍 Search articles..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
