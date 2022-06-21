import * as React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  addCustomViewGrupingBy,
  addCustomViewOrderingBy,
} from "../../../../store/filtersIssues";

interface ViewGrupingFiltersProps {}

const ViewGrupingFilters: React.FC<ViewGrupingFiltersProps> = () => {
  const viewFilters = useSelector(
    (state: any) => state.filtersIssues.viewFilters
  );

  // const customViewFilters = !viewFilters.empty

  const useGrupingValue =
    viewFilters.custom.groupingBy != null
      ? viewFilters.custom.groupingBy
      : "status";
  const useOrderingValue =
    viewFilters.custom.orderingBy != null
      ? viewFilters.custom.orderingBy
      : "status";

  const [grupingValue, setGrupingValue] = React.useState(useGrupingValue);
  const [orderingValue, setOrderingValue] = React.useState(useOrderingValue);

  const dispatch = useDispatch();

  function changeGrupingValue(value: any) {
    dispatch(addCustomViewGrupingBy(value.target.value));

    setGrupingValue(value.target.value);
  }

  function changeOrderingValue(value: any) {
    dispatch(addCustomViewOrderingBy(value.target.value));

    setOrderingValue(value.target.value);
  }

  return (
    <div className="gruping-container p-2">
      <div className="gruping-row flex gap-2 items-center justify-between p-2">
        <div className="gruping-row__title mr-2">Gruping</div>
        <div className="gruping-row__selector flex justify-between items-center ml-2">
          <select
            name=""
            id=""
            value={grupingValue}
            onChange={changeGrupingValue}
          >
            <option value={"status"}>Status</option>
            <option value={"priority"}>Priority</option>
            <option value={"assignee"}>Assignee</option>
            <option value={"none"}>No grouping</option>
          </select>
        </div>
      </div>

      {/* <div className="ordering-row flex gap-2 items-center justify-between p-2">
        <div className="gruping-row__title mr-2">Ordering</div>
        <div className="gruping-row__selector flex justify-between items-center ml-2">
          <select
            name=""
            id=""
            value={orderingValue}
            onChange={changeOrderingValue}
          >
            <option value={"status"}>Status</option>
            <option value={"priority"}>Priority</option>
            <option value={"assignee"}>Last updated</option>
            <option value={"created"}>Last created</option>
          </select>
        </div>
      </div> */}
    </div>
  );
};

export default ViewGrupingFilters;
