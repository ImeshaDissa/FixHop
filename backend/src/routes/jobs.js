const express = require("express");
const router = express.Router();
const JobRequest = require("../models/JobRequest");

// GET /api/jobs
// Supports ?category=Plumbing, ?status=Open, ?search=keyword
router.get("/", async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) filter.category = req.query.category;
    if (req.query.status) filter.status = req.query.status;

    // Bonus: keyword search across title and description
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
});

// GET /api/jobs/:id
router.get("/:id", async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    next(err);
  }
});

// POST /api/jobs
router.post("/", async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail } =
      req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const job = new JobRequest({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    next(err);
  }
});

// PATCH /api/jobs/:id  — update status only
router.patch("/:id", async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Open", "In Progress", "Closed"];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/jobs/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
