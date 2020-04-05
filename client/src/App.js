import React, { lazy, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./routing/PrivateRoute";
import { fetchClients } from "./actions/clientActions";
import { loadUser } from "./actions/authActions";
import ResponsiveDrawer from "./layouts/Drawer/ResponsiveDrawer";
import MySnackbar from "./components/Snackbar/MySnackbar";
import { BigLogoSpinner } from "./layouts/Loader/Loaders";
import { NotFound } from "./layouts/NotFound/NotFound";
import "./App.css";

// import LandingPage from "./layouts/LandingPage/LandingPage";

// import { MessagesLayout } from "./layouts/Messages/MessagesLayout";

// const Schedule = lazy(() => {
//   Promise.apply(store.dispatch(fetchClients())).then(
//     Promise.resolve(
//       import(/* webpackChunkName: "Schedule"*/ "./components/Schedule/Schedule")
//     )
//   );

// return new Promise(Promise.call => store.dispatch(fetchClients())).then(Promise.resolve =>
//   import(/* webpackChunkName: "Schedule"*/ "./components/Schedule/Schedule")
// );
// store.dispatch(fetchClients());
// return import(
//   /* webpackChunkName: "Schedule"*/ "./components/Schedule/Schedule"
// );
// });

// const MessagesPage = lazy(() =>
//   import(
//     /* webpackChunkName: "WorkoutsManagePage"*/ "./layouts/Messages/MessagesLayout"
//   )
// );

// const ClientsManager = lazy(
//   async () => await store.dispatch(fetchClients()),
//   import(
//     /* webpackChunkName: "ClientsManagePage"*/ "./layouts/Client/ClientsManagePage"
//   )
// );

// const Home = lazy(() =>
//   import(/* webpackChunkName: "Home"*/ "./layouts/Home/Home")
// );

// const Account = lazy(
//   async () => await store.dispatch(loadUser()),
//   import(/* webpackChunkName: "Account"*/ "./layouts/Account/Account")
// );

// const ClientProfilePage = lazy(() =>
//   import(
//     /* webpackChunkName: "ClientProfilePage"*/ "./layouts/Client/ClientProfilePage"
//   )
// );

const LandingPage = lazy(() =>
  import(
    /* webpackChunkName: "LandingPage"*/ "./layouts/LandingPage/LandingPage"
  )
);

const Schedule = lazy(async () => {
  await store.dispatch(fetchClients());
  const [moduleExports] = await Promise.all([
    import(/* webpackChunkName: "Schedule"*/ "./components/Schedule/Schedule"),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]);
  return moduleExports;
});

const WorkoutesManager = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(
      /* webpackChunkName: "WorkoutsManagePage"*/ "./layouts/Workouts/WorkoutsManagePage"
    ),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]);
  return moduleExports;
});

const ClientsManager = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(
      /* webpackChunkName: "ClientsManagePage"*/ "./layouts/Client/ClientsManagePage"
    ),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]);
  return moduleExports;
});

const Home = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(/* webpackChunkName: "Home"*/ "./layouts/Home/Home"),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]);
  return moduleExports;
});

const Account = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(/* webpackChunkName: "Account"*/ "./layouts/Account/Account"),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]);
  return moduleExports;
});

const ClientProfilePage = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(
      /* webpackChunkName: "ClientProfilePage"*/ "./layouts/Client/ClientProfilePage"
    ),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]);
  return moduleExports;
});

const SendMessagePage = lazy(async () => {
  localStorage.setItem("lastPageView", "New Message");
  const [moduleExports] = await Promise.all([
    import(
      /* webpackChunkName: "SendMessagePage"*/ "./layouts/Messages/SendMessagePage"
    ),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]);
  return moduleExports;
});

const AllMessagesPage = lazy(async () => {
  localStorage.setItem("lastPageView", "Messages Center");
  const [moduleExports] = await Promise.all([
    import(
      /* webpackChunkName: "AllMessagesPage"*/ "./layouts/Messages/AllMessagesPage"
    ),
    new Promise((resolve) => setTimeout(resolve, 300)),
  ]);
  return moduleExports;
});

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<BigLogoSpinner />}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <ResponsiveDrawer>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Home} />
                <PrivateRoute
                  exact
                  path="/dashboard/schedule"
                  component={Schedule}
                />
                <PrivateRoute
                  exact
                  path="/dashboard/workouts"
                  component={WorkoutesManager}
                />
                <PrivateRoute
                  exact
                  path="/dashboard/clients"
                  component={ClientsManager}
                />
                <PrivateRoute
                  exact
                  path="/dashboard/clients/:id"
                  component={ClientProfilePage}
                />
                <PrivateRoute
                  exact
                  path="/dashboard/messages/new"
                  component={SendMessagePage}
                />
                <PrivateRoute
                  exact
                  path="/dashboard/messages"
                  component={AllMessagesPage}
                />
                <PrivateRoute
                  exact
                  path="/dashboard/account"
                  component={Account}
                />
                <PrivateRoute component={NotFound} />
              </Switch>
              <MySnackbar />
            </ResponsiveDrawer>
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
