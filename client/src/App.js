import React, { lazy, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import ResponsiveDrawer from "./layouts/Drawer/ResponsiveDrawer";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "./layouts/Loader/Spinner";
import "./App.css";
import { NotFound } from "./layouts/NotFound/NotFound";
import { loadUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./routing/PrivateRoute";
import { fetchClients } from "./actions/clientActions";
import LandingPage from "./layouts/LandingPage/LandingPage";
import MySnackbar from "./components/Snackbar/MySnackbar";

// const LandingPage = lazy(() =>
//   import(
//     /* webpackChunkName: "LandingPage"*/ "./layouts/LandingPage/LandingPage"
//   )
// );

// const Schedule = lazy(() =>
//   import(/* webpackChunkName: "Schedule"*/ "./components/Schedule2")
// );

// const WorkoutesManager = lazy(() =>
//   import(
//     /* webpackChunkName: "WorkoutsManagePage"*/ "./layouts/WorkoutsManagePage"
//   )
// );

// const ClientsManager = lazy(() =>
//   import(
//     /* webpackChunkName: "ClientsManagePage"*/ "./layouts/ClientsManagePage"
//   )
// );

// const Home = lazy(() => import(/* webpackChunkName: "Home"*/ "./layouts/Home"));

// const Account = lazy(() =>
//   import(/* webpackChunkName: "Account"*/ "./layouts/Account")
// );

// const ClientProfilePage = lazy(() =>
//   import(
//     /* webpackChunkName: "ClientProfilePage"*/ "./layouts/ClientProfilePage"
//   )
// );

const Schedule = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(/* webpackChunkName: "Schedule"*/ "./components/Schedule/Schedule"),
    new Promise(resolve => setTimeout(resolve, 600))
  ]);
  return moduleExports;
});

const WorkoutesManager = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(
      /* webpackChunkName: "WorkoutsManagePage"*/ "./layouts/Workouts/WorkoutsManagePage"
    ),
    new Promise(resolve => setTimeout(resolve, 600))
  ]);
  return moduleExports;
});

const ClientsManager = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(
      /* webpackChunkName: "ClientsManagePage"*/ "./layouts/Client/ClientsManagePage"
    ),
    new Promise(resolve => setTimeout(resolve, 600))
  ]);
  return moduleExports;
});

const Home = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(/* webpackChunkName: "Home"*/ "./layouts/Home/Home"),
    new Promise(resolve => setTimeout(resolve, 600))
  ]);
  return moduleExports;
});

const Account = lazy(async () => {
  await store.dispatch(loadUser());
  const [moduleExports] = await Promise.all([
    import(/* webpackChunkName: "Account"*/ "./layouts/Account/Account"),
    new Promise(resolve => setTimeout(resolve, 600))
  ]);
  return moduleExports;
});

const ClientProfilePage = lazy(async () => {
  await store.dispatch(fetchClients());
  const [moduleExports] = await Promise.all([
    import(
      /* webpackChunkName: "ClientProfilePage"*/ "./layouts/Client/ClientProfilePage"
    ),
    new Promise(resolve => setTimeout(resolve, 600))
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
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Suspense fallback={<Spinner />}>
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
                  path="/dashboard/account"
                  component={Account}
                />
                <PrivateRoute component={NotFound} />
              </Switch>
              <MySnackbar />
            </ResponsiveDrawer>
          </Suspense>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
