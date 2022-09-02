import AppAreaLayout from "./components/layouts/AppArea";
import ClientAreaLayout from "./components/layouts/ClientArea";
import ClientArea from "./components/client-area";
import AppArea from "./components/app-area";
import {
  changeUserStatus,
  changeUnsubscribeStatus,
  changeErrorStatus,
} from "./store/auth";
import { userState } from "./api/dataBaseAuthMethods";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {} from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import "./styles/signButtons.css";

function App() {
  const dispatch = useDispatch();

  // const [currentUser,setCurrentUser] = useState<null | {email:string}>(null)
  const currentUser = useSelector((state: any) => state.auth.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function setStatusCurrentUser(user: { email: string; uid: string } | null) {
      // setCurrentUser(user)

      dispatch(changeUserStatus(user));
    }

    const { error, data } = userState(setStatusCurrentUser);

    if (error) {
      dispatch(changeErrorStatus(error));
      setLoading(false);
      return;
    }

    setLoading(false);
    dispatch(changeUnsubscribeStatus(data));
  }, [dispatch, currentUser]); // functions like dispatch are  here only because of the "Mr. eslint" is screaming his lungs of

  return (
    <div className="App">
      {currentUser == null && (
        <ClientAreaLayout>
          <ClientArea />
        </ClientAreaLayout>
      )}

      {currentUser != null && (
        <AppAreaLayout>
          <AppArea />
        </AppAreaLayout>
      )}
    </div>
  );
}

export default App;
