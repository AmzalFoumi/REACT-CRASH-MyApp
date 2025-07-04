import React, { useEffect, useState } from "react";

import JobListingSingular from "./JobListingSingular";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  // //Dynamically choosing to show only 3 jobs if its home page, and showing all jobs if not
  // const jobListings = isHome ? jobs.slice(0, 3) : jobs;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // console.log(jobs);
  return (
    <>
      {/* <!-- Browse Jobs --> */}
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {/* Dynamically loading a title */}
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          {/* 
              Conditional rendering based on loading state:
              If loading is true, show a "Loading" message.
              Once data is fetched (loading is false), 
              map over the jobs array and render JobListingSingular for each job.
            */}
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListingSingular key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default JobListings;
