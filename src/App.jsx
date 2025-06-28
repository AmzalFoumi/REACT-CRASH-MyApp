import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import AddJobPage from "./pages/AddJobPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/add-job" element={<AddJobPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

//Some code previously used to get a feel of JSX
// import React from 'react'

// const App = () => {
// const name = "John";
// const names = ['Brad', 'Jimi', 'kaml', 'damar'];
// const loggedIn = true;
// const styles = {
//   color:'red',
//   fontSize:'15px',
// }

//   return (
//     // <div>App</div>
//     <>
//      <div classNameName="bg-blue-500 text-white p-8 text-center"></div>
//       <h1 classNameName="text-4xl font-bold">Hello {name} v4!</h1>
//       <p classNameName="mt-4">This uses the default font.</p>
//       <ul>
//         {names.map((name, index) =>(
//           <li key={index} style={styles} >{name}</li>
//         ))}
//       </ul>
//       {loggedIn && <h1>Hello Member</h1>}
//     </>
//   )
// }

// export default App
