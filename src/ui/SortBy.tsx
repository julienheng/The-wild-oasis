import Select from "./Select";
import { useSearchParams } from "react-router-dom";

type Props = {
  options: { value: string; label: string }[];
  
};

export default function SortBy({ options }: Props) {

  const [searchParams, setSearchParams] = useSearchParams();
  useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
   }

  return <Select options={options} type="white" value={sortBy} onChange={handleChange}></Select>;
}
