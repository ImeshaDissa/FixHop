export function StatusBadge({ status }) {
  const styles = {
    Open: "bg-green-100 text-green-800",
    "In Progress": "bg-amber-100 text-amber-800",
    Closed: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export function CategoryBadge({ category }) {
  const styles = {
    Plumbing: "bg-blue-100 text-blue-800",
    Electrical: "bg-yellow-100 text-yellow-800",
    Painting: "bg-pink-100 text-pink-800",
    Joinery: "bg-orange-100 text-orange-800",
    Other: "bg-purple-100 text-purple-800",
  };
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${
        styles[category] || "bg-gray-100 text-gray-600"
      }`}
    >
      {category}
    </span>
  );
}
