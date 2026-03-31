import { Select } from "antd";
import { FaTrash } from "react-icons/fa";

export default function SavedSearches({
  onChange,
  savedSearchesOptions,
  savedSearches,
  onDelete,
}: {
  onChange: (value: string) => void;
  onDelete: (id: string) => void;
  savedSearches: string | null | "";
  savedSearchesOptions: { value: string; label: string }[];
}) {
  return (
    <Select
      className="w-full md:w-1/4"
      placeholder="Saved Searches..."
      value={savedSearches || undefined}
      defaultValue={""}
      options={[
        { value: "", label: "Select a saved search..." },
        ...savedSearchesOptions.map((s) => ({
          value: s.value,
          label: s.label,
        })),
      ]}
      optionRender={(option) => (
        <div className="flex justify-between items-baseline">
          <span>{option.label}</span>
          {option.value === "" ? null : (
            <FaTrash
              onClick={(e) => {
                e.stopPropagation();
                onDelete(option.value as string);
              }}
              style={{ cursor: "pointer", color: "#999" }}
            />
          )}
        </div>
      )}
      onChange={onChange}
    />
  );
}
