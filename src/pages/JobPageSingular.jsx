import React, { useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import Spinner from "../components/Spinner";

const JobPageSingular = () => {
  const { id } = useParams();
  const job = useLoaderData();

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <a
            href="/jobs.html"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Job Listings
          </a>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">Full-Time</div>
                <h1 className="text-3xl font-bold mb-4">
                  Senior React Developer
                </h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <i className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
                  <p className="text-orange-700">Boston, MA</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">
                  We are seeking a talented Front-End Developer to join our team
                  in Boston, MA. The ideal candidate will have strong skills in
                  HTML, CSS, and JavaScript, with experience working with modern
                  JavaScript frameworks such as React or Angular.
                </p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">$70k - $80K / Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Company Info --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">NewTek Solutions</h2>

                <p className="my-2">
                  NewTek Solutions is a leading technology company specializing
                  in web development and digital solutions. We pride ourselves
                  on delivering high-quality products and services to our
                  clients while fostering a collaborative and innovative work
                  environment.
                </p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  contact@newteksolutions.com
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">555-555-5555</p>
              </div>

              {/* <!-- Manage -->} */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <a
                  href="/add-job.html"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </a>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );

  // ────────────────────────────────────────────────────────────────
  // This is a **component-level data fetching approach** using useEffect.
  // It fetches the job data *after* the component has mounted.
  //
  // In contrast to `jobLoader`, this method does NOT preload data,
  // so the component initially renders without the job info,
  // then updates when the fetch completes.
  //
  // Downsides compared to jobLoader:
  // - No built-in loading delay handling by React Router
  // - Slightly slower user experience due to post-render fetching
  // - More complex logic inside the component (less separation of concerns)
  //
  // Use this pattern only when:
  // - You need to fetch data based on client-side interactions
  // - You’re not using React Router’s loader feature
  // ────────────────────────────────────────────────────────────────

  //   const [job, setJob] = useState(null);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchJob = async () => {
  //       try {
  //         const res = await fetch(`/api/jobs/${id}`);
  //         const data = await res.json();
  //         setJob(data);
  //       } catch (error) {
  //         console.log("Error fetching data", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchJob();
  //   }, []);

  //   return loading ? <Spinner /> : <h1>{job.title}</h1>;
};

// ────────────────────────────────────────────────────────────────
// jobLoader is a **custom data loader function** that WE create.
// It does NOT come built-in from react-router-dom. Instead,
// React Router provides a mechanism (via the `loader` prop in <Route>)
// that allows us to plug in our own functions like this.
//
// PURPOSE:
// - This function fetches job data from the backend for a specific job ID.
// - It is used with `createBrowserRouter` or `createRoutesFromElements`
//   in your router config as the `loader` property for a specific route.
//
// HOW IT WORKS:
// - React Router will automatically execute this function BEFORE rendering
//   the route’s component (e.g., <JobPageSingular />).
// - The returned data becomes available to the component via the `useLoaderData()` hook.
//
// BENEFITS:
// - Keeps the component itself clean and free of data-fetching logic.
// - Supports route-level data fetching, improving performance and user experience.
//
// EXAMPLE USAGE:
// In your router setup:
//
// ```js
//   <Route
//     path="/jobs/:id"
//     element={<JobPageSingular />}
//     loader={jobLoader}
//   />
// ```
//
// Inside the component:
// ```js
//   const job = useLoaderData(); // Accesses data returned by jobLoader
// ```
//
// You can define similar loader functions (e.g., `jobsLoader`, `companyLoader`)
// for other components/pages that need data before rendering.
// ────────────────────────────────────────────────────────────────

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobPageSingular as default, jobLoader };
