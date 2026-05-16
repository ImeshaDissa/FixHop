import Link from "next/link";
import { StatusBadge, CategoryBadge } from "./Badges";

export default function JobCard({ job }) {
  const date = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/jobs/${job._id}`} className="block group">
      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-300 transition-all">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug">
            {job.title}
          </h2>
          <StatusBadge status={job.status} />
        </div>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{job.description}</p>
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          {job.category && <CategoryBadge category={job.category} />}
          {job.location && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {job.location}
            </span>
          )}
          <span className="text-xs text-gray-400 ml-auto">{date}</span>
        </div>
      </div>
    </Link>
  );
}
