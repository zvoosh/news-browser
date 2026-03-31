import { Button } from "antd";
import { SavedSearches } from "./formComponents";

export default function SavedSearchesActions({
  handleOnClick,
  savedSearches,
  savedSearchesOptions,
  onChange,
  onDelete,
}: {
  handleOnClick: () => void;
  savedSearches: string | null | "";
  savedSearchesOptions: { value: string; label: string }[];
  onChange: (value: string) => void;
  onDelete: (searchOptionValue: string) => void;
}) {
  return (
    <div className="w-full mt-5 flex px-10 gap-5">
      <Button type="primary" onClick={handleOnClick}>
        Save Search
      </Button>
      <SavedSearches
        savedSearches={savedSearches}
        onChange={onChange}
        savedSearchesOptions={savedSearchesOptions}
        onDelete={onDelete}
      />
    </div>
  );
}
