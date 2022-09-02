import * as React from "react";
// import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import CircularProgress from "@mui/material/CircularProgress";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ShippingIcon from "../../../images/shipping/RoutePlusGray.svg";

import { changeDrawerStateByDirectionId } from "../../../store/drawers";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LeftSideMenu from "../left-menu";

type Anchor = "top" | "left" | "bottom" | "right";

export default function LeftMenuDrawer() {
  const dispatch = useDispatch();
  const useid = React.useId();
  const navigate = useNavigate();

  const drawersState = useSelector((state: any) => state.drawer.drawers);
  const drawersMenuTypeState = useSelector(
    (state: any) => state.drawer.menuType
  );

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      changeLeftDrawerState(open, anchor);
    };

  function changeLeftDrawerState(newStatus: boolean, direction: string) {
    dispatch(
      changeDrawerStateByDirectionId({
        direction,
        newStatus,
      })
    );
  }

  function returnFitTypeMenu() {
    const menuTypes: { [menuType: string]: () => any } = {
      menu: () => {
        return (
          <div className="options-menu-container h-full ">
            <LeftSideMenu />
          </div>
        );
      },
    };
    return menuTypes[drawersMenuTypeState]();
  }
  return (
    <div className="w-0 h-0">
      {(["left", "right", "top", "bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={drawersState[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{
              "& .MuiPaper-root": {
                width: window.screen.width <= 440 ? "100%" : "63%",
              },
            }}
          >
            <div className="h-full  menu-container ">
              <div className="header border-b mb-2 flex justify-end items-center px-4 py-2 text-gray-700">
                <div
                  className="icon"
                  onClick={() => {
                    changeLeftDrawerState(false, "left");
                  }}
                >
                  <CloseOutlinedIcon />
                </div>
              </div>
              <div className="content">{returnFitTypeMenu()}</div>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
