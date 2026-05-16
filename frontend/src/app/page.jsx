"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import { getJobs } from "@/lib/api";

const CATEGORIES = ["All", "Plumbing", "Electrical", "Painting", "Joinery", "Other"];
const STATUSES = ["All", "Open", "In Progress", "Closed"];

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const filters = {};
        if (category !== "All") filters.category = category;
        if (status !== "All") filters.status = status;
        if (search.trim()) filters.search = search.trim();
        const data = await getJobs(filters);
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [category, status, search]);

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse open requests from homeowners across the LK
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3">
        {/* Search (bonus) */}
        <input
          type="text"
          placeholder="Search requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All Categories" : c}
            </option>
          ))}
        </select>
        {/* Status filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All Statuses" : s}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {loading && (
        <div className="text-center text-gray-400 py-16 text-sm">Loading requests...</div>
      )}
      {error && (
        <div className="text-center text-red-500 py-16 text-sm">
          Could not load jobs: {error}
        </div>
      )}
      {!loading && !error && jobs.length === 0 && (
        <div className="text-center text-gray-400 py-16 text-sm">
          No requests found. Try adjusting your filters.
        </div>
      )}
      {!loading && !error && jobs.length > 0 && (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
