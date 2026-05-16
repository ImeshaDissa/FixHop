"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/api";

const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery", "Other"];

const INITIAL = {
  title: "",
  description: "",
  category: "",
  location: "",
  contactName: "",
  contactEmail: "",
};

export default function NewJobPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (
      form.contactEmail &&
      !/^\S+@\S+\.\S+$/.test(form.contactEmail)
    ) {
      e.contactEmail = "Please enter a valid email address";
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    setServerError(null);
    try {
      await createJob(form);
      router.push("/");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Post a Service Request</h1>
        <p className="text-gray-500 text-sm mt-1">
          Tell tradespeople what you need and where you are
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/*------------title--------- */}
          <Field label="Title" required error={errors.title}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Leaking kitchen tap needs fixing"
              className={inputClass(errors.title)}
            />
          </Field>

          {/*---------description-------------*/}
          <Field label="Description" required error={errors.description}>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the job in as much detail as possible"
              rows={4}
              className={inputClass(errors.description)}
            />
          </Field>

          {/* --------category and location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass()}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Location">
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Colombo"
                className={inputClass()}
              />
            </Field>
          </div>

          {/*contact , mail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Your Name">
              <input
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                placeholder="e.g. Sandra McAllister"
                className={inputClass()}
              />
            </Field>
            <Field label="Your Email" error={errors.contactEmail}>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="e.g. sandra@example.com"
                className={inputClass(errors.contactEmail)}
              />
            </Field>
          </div>

          {serverError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {serverError}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? "Posting..." : "Post Request"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-sm text-gray-500 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function inputClass(hasError) {
  return [
    "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors",
    hasError
      ? "border-red-400 focus:ring-red-300"
      : "border-gray-300 focus:ring-indigo-400",
  ].join(" ");
}
