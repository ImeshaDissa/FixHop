const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/server");
const JobRequest = require("../src/models/JobRequest");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await JobRequest.deleteMany({});
});

describe("GET /api/jobs", () => {
  it("returns an empty array when no jobs exist", async () => {
    const res = await request(app).get("/api/jobs");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("returns all jobs", async () => {
    await JobRequest.create([
      { title: "Job A", description: "Desc A", category: "Plumbing" },
      { title: "Job B", description: "Desc B", category: "Electrical" },
    ]);
    const res = await request(app).get("/api/jobs");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it("filters by category", async () => {
    await JobRequest.create([
      { title: "Job A", description: "Desc A", category: "Plumbing" },
      { title: "Job B", description: "Desc B", category: "Electrical" },
    ]);
    const res = await request(app).get("/api/jobs?category=Plumbing");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].category).toBe("Plumbing");
  });

  it("filters by status", async () => {
    await JobRequest.create([
      { title: "Open Job", description: "Desc", status: "Open" },
      { title: "Closed Job", description: "Desc", status: "Closed" },
    ]);
    const res = await request(app).get("/api/jobs?status=Closed");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].status).toBe("Closed");
  });
});

describe("POST /api/jobs", () => {
  it("creates a job with valid data", async () => {
    const payload = {
      title: "Fix boiler",
      description: "Boiler making loud noise",
      category: "Plumbing",
      location: "Glasgow",
      contactName: "Test User",
      contactEmail: "test@example.com",
    };
    const res = await request(app).post("/api/jobs").send(payload);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(payload.title);
    expect(res.body.status).toBe("Open");
  });

  it("returns 400 when title is missing", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .send({ description: "No title here" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it("returns 400 for an invalid email", async () => {
    const res = await request(app).post("/api/jobs").send({
      title: "Test",
      description: "Test description",
      contactEmail: "not-an-email",
    });
    expect(res.status).toBe(400);
  });
});

describe("PATCH /api/jobs/:id", () => {
  it("updates status to In Progress", async () => {
    const job = await JobRequest.create({
      title: "Job",
      description: "Desc",
    });
    const res = await request(app)
      .patch(`/api/jobs/${job._id}`)
      .send({ status: "In Progress" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("In Progress");
  });

  it("returns 400 for an invalid status", async () => {
    const job = await JobRequest.create({ title: "Job", description: "Desc" });
    const res = await request(app)
      .patch(`/api/jobs/${job._id}`)
      .send({ status: "Pending" });
    expect(res.status).toBe(400);
  });

  it("returns 404 for a non-existent job", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .patch(`/api/jobs/${fakeId}`)
      .send({ status: "Closed" });
    expect(res.status).toBe(404);
  });
});
