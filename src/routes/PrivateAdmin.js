// import React from "react";
// import { Route, Redirect } from "react-router-dom";

// import { store } from "~/ducks/store";

// const ROLE = process.env.REACT_APP_ADMIN_ROLE;

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={function (props) {
//       const { signed } = store.getState().auth;
//       if (!signed) {
//         return (
//           <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//         );
//       }

//       // const { role } = store.getState().user.user;

//       return <Component {...props} />;
//     }}
//   />
// );

// export default PrivateRoute;
