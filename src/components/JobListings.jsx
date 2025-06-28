import React from "react";
import jobs from "../jobs.json";
import JobListingSingular from "./JobListingSingular";

const JobListings = ({ isHome = false }) => {
  //Dynamically choosing to show only 3 jobs if its home page, and showing all jobs if not
  const jobListings = isHome ? jobs.slice(0, 3) : jobs;

  console.log(jobs);
  return (
    <>
      {/* <!-- Browse Jobs --> */}
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {/* Dynamically loading a title */}
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobListings.map((job) => (
              <JobListingSingular key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListings;
