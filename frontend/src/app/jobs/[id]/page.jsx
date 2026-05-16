"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getJob, updateJobStatus, deleteJob } from "@/lib/api";
import { StatusBadge, CategoryBadge } from "@/components/Badges";

const STATUSES = ["Open", "In Progress", "Closed"];

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusValue, setStatusValue] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getJob(id);
        setJob(data);
        setStatusValue(data.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    setUpdateMsg(null);
    try {
      const updated = await updateJobStatus(id, newStatus);
      setJob(updated);
      setStatusValue(updated.status);
      setUpdateMsg("Status updated");
      setTimeout(() => setUpdateMsg(null), 2500);
    } catch (err) {
      setUpdateMsg("Failed to update: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this request? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteJob(id);
      router.push("/");
    } catch (err) {
      alert("Failed to delete: " + err.message);
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-24 text-sm">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center py-24">
        <p className="text-red-500 text-sm mb-4">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="text-sm text-indigo-600 underline"
        >
          Back to all requests
        </button>
      </div>
    );
  }

  const date = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => router.push("/")}
        className="text-sm text-gray-500 hover:text-gray-800 mb-5 flex items-center gap-1 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All requests
      </button>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-900 leading-snug">{job.title}</h1>
          <StatusBadge status={job.status} />
        </div>

        {/* Description */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
          <p className="text-sm text-gray-800 leading-relaxed">{job.description}</p>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {job.category && (
            <Detail label="Category">
              <CategoryBadge category={job.category} />
            </Detail>
          )}
          {job.location && <Detail label="Location">{job.location}</Detail>}
          {job.contactName && <Detail label="Contact">{job.contactName}</Detail>}
          {job.contactEmail && (
            <Detail label="Email">
              <a
                href={`mailto:${job.contactEmail}`}
                className="text-indigo-600 hover:underline"
              >
                {job.contactEmail}
              </a>
            </Detail>
          )}
          <Detail label="Posted">{date}</Detail>
        </div>

        <hr className="border-gray-100" />

        {/* Status update */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Update Status</p>
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
              disabled={updating}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={() => handleStatusChange(statusValue)}
              disabled={updating || statusValue === job.status}
              className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {updating ? "Saving..." : "Save"}
            </button>
            {updateMsg && (
              <span className="text-xs text-green-600">{updateMsg}</span>
            )}
          </div>
        </div>

        {/* Delete */}
        <div className="pt-2">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
          >
            {deleting ? "Deleting..." : "Delete Request"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, children }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 mb-0.5 uppercase tracking-wide">
        {label}
      </p>
      <div className="text-gray-800">{children}</div>
    </div>
  );
}
