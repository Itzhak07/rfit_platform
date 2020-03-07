import React, { lazy, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import ResponsiveDrawer from "./layouts/ResponsiveDrawer";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "./layouts/Spinner";
import "./App.css";
import { NotFound } from "./layouts/NotFound";
import { loadUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./routing/PrivateRoute";
import { fetchClients } from "./actions/clientActions";

// import whyDidYouRender from "@welldone-software/why-did-you-render";

const LandingPage = lazy(() =>
  import(
    /* webpackChunkName: "LandingPage"*/ "./layouts/LandingPage/LandingPage"
  )
);

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
    import(/* webpackChunkName: "Schedule"*/ "./components/Schedule2"),
    new Promise(resolve => setTimeout(resolve, 600))
  ]);
  return moduleExports;
});

const WorkoutesManager = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(
      /* webpackChunkName: "WorkoutsManagePage"*/ "./layouts/WorkoutsManagePage"
    ),
    new Promise(resolve => setTimeout(resolve, 600))
  ]);
  return moduleExports;
});

const ClientsManager = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(
      /* webpackChunkName: "ClientsManagePage"*/ "./layouts/ClientsManagePage"
    ),
    new Promise(resolve => setTimeout(resolve, 600))
  ]);
  return moduleExports;
});

const Home = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import(/* webpackChunkName: "Home"*/ "./layouts/Home"),
    new Promise(resolve => setTimeout(resolve, 600))
  ]);
  return moduleExports;
});

const Account = lazy(async () => {
  await store.dispatch(loadUser());
  const [moduleExports] = await Promise.all([
    import(/* webpackChunkName: "Account"*/ "./layouts/Account"),
    new Promise(resolve => setTimeout(resolve, 600))
  ]);
  return moduleExports;
});

const ClientProfilePage = lazy(async () => {
  // await store.dispatch(fetchClients());
  const [moduleExports] = await Promise.all([
    import(
      /* webpackChunkName: "ClientProfilePage"*/ "./layouts/ClientProfilePage"
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
      <Suspense fallback={<Spinner />}>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <ResponsiveDrawer>
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
            </ResponsiveDrawer>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </Provider>
  );
}

export default App;
