import * as React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import CancelText from "@mui/icons-material/HighlightOffSharp";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  // const params = useParams()
  const navigate = useNavigate();
  const workspaceSelected = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  ); // workspaceURL

  const [searchParams, setSearchParams] = useSearchParams(); // we could just let a comma and delete the set you know
  const searchedTextIs = searchParams.get("q");
  const useSearchedTextAsValue = searchedTextIs != null ? searchedTextIs : "";
  const [searchText, setSearchText] = React.useState(useSearchedTextAsValue);
  // const searchWithWorkspaceURL = params.workspaceURL

  function deleteAllText() {
    setSearchText("");
  }

  function handleEnterKeyDown(event: any) {
    if (event.key === "Enter" && searchText !== "") {
      const workspaceURL = workspaceSelected.workspaceURL;

      navigate(`/reduce-issues/${workspaceURL}/search?q=${searchText}`);
    }
  }

  return (
    <div className="search-container px-4 mb-4 flex items-center gap-1">
      <SearchSharpIcon />
      <TextField
        fullWidth
        id="fullWidth"
        variant="standard"
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
        onKeyDown={handleEnterKeyDown}
      />
      <CancelText
        onClick={deleteAllText}
        className={
          searchText.length <= 0 ? "invisible" : "visible cursor-pointer"
        }
        sx={{ height: 20, width: 20 }}
      />
    </div>
  );
};

export default SearchBar;
