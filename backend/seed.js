require("dotenv").config();
const mongoose = require("mongoose");
const JobRequest = require("./src/models/JobRequest");

const sampleJobs = [
  {
    title: "Leaking kitchen tap needs urgent fix",
    description:
      "The cold tap under my kitchen sink has been dripping for two weeks. Water is pooling under the cabinet. Need someone who can replace the washer or the tap unit entirely.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "Sandra McAllister",
    contactEmail: "sandra.m@example.com",
    status: "Open",
  },
  {
    title: "Faulty RCD in consumer unit tripping daily",
    description:
      "The residual current device in my garage consumer unit trips every morning. Unsure what is causing it. Need a qualified electrician to inspect and repair.",
    category: "Electrical",
    location: "Edinburgh",
    contactName: "James Whitfield",
    contactEmail: "j.whitfield@example.com",
    status: "Open",
  },
  {
    title: "Full interior repaint — three-bedroom flat",
    description:
      "Looking for a painter to repaint all walls and ceilings in a three-bedroom flat. Walls are currently magnolia. Prefer a neutral grey throughout. All materials can be supplied.",
    category: "Painting",
    location: "Manchester",
    contactName: "Priya Nair",
    contactEmail: "priya.nair@example.com",
    status: "In Progress",
  },
  {
    title: "Bespoke fitted wardrobe for master bedroom",
    description:
      "Need a joiner to build a floor-to-ceiling fitted wardrobe with sliding doors in the master bedroom. Space is approximately 3m wide by 2.4m tall.",
    category: "Joinery",
    location: "Leeds",
    contactName: "Tom Briggs",
    contactEmail: "tombriggs@example.com",
    status: "Open",
  },
  {
    title: "Outdoor tap installation for garden hose",
    description:
      "Would like an outdoor tap fitted on the back wall of the house, connected to the internal supply. Garden is large and I need a long-reach hose connection.",
    category: "Plumbing",
    location: "Bristol",
    contactName: "Helen Cooper",
    contactEmail: "helencooper@example.com",
    status: "Closed",
  },
  {
    title: "Replace skirting boards throughout hallway",
    description:
      "Old MDF skirting boards in the hallway and landing are damaged and need replacing with new solid wood boards. Approximately 18 linear metres in total.",
    category: "Joinery",
    location: "Birmingham",
    contactName: "Ravi Sharma",
    contactEmail: "ravi.s@example.com",
    status: "Open",
  },
  {
    title: "Install outdoor security lighting front and rear",
    description:
      "Need PIR-activated security lights fitted at the front and rear of the property. Two units total. Cabling would need to run from the garage consumer unit.",
    category: "Electrical",
    location: "Glasgow",
    contactName: "Carol Drummond",
    contactEmail: "carol.d@example.com",
    status: "Open",
  },
  {
    title: "Loft hatch repair and boarding",
    description:
      "The loft hatch frame is warped and no longer closes flush. Also looking to have approximately 20 square metres of loft space boarded out for storage.",
    category: "Joinery",
    location: "Sheffield",
    contactName: "Mike Flaherty",
    contactEmail: "m.flaherty@example.com",
    status: "In Progress",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await JobRequest.deleteMany({});
    console.log("Cleared existing job requests");

    await JobRequest.insertMany(sampleJobs);
    console.log(`Seeded ${sampleJobs.length} job requests`);

    await mongoose.disconnect();
    console.log("Done. Disconnected from MongoDB.");
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
}

seed();
