
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const internships = [
  {
    id: '1',
    title: 'Web Development Intern',
    company: 'Tech Solutions',
    duration: '3 months',
    description: 'Learn HTML, CSS, JavaScript and React.'
  },
  {
    id: '2',
    title: 'Python Developer Intern',
    company: 'CodeWorks',
    duration: '2 months',
    description: 'Practice Python and backend development.'
  },
  {
    id: '3',
    title: 'Data Analytics Intern',
    company: 'Data Insights',
    duration: '3 months',
    description: 'Learn data analysis and visualization.'
  }
];

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true
    },
    internshipId: {
      type: String,
      required: true
    },
    internshipTitle: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Application = mongoose.model(
  'Application',
  applicationSchema
);

app.get('/', (req, res) => {
  res.json({ message: 'Student Internship Portal API is running' });
});

app.get('/api/internships', (req, res) => {
  res.json(internships);
});

app.get('/api/internships/:id', (req, res) => {
  const internship = internships.find(
    item => item.id === req.params.id
  );

  if (!internship) {
    return res.status(404).json({
      message: 'Internship not found'
    });
  }

  res.json(internship);
});

app.post('/api/applications', async (req, res) => {
  try {
    const { name, email, rollNumber, internshipId } = req.body;

    if (!name || !email || !rollNumber || !internshipId) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const internship = internships.find(
      item => item.id === String(internshipId)
    );

    if (!internship) {
      return res.status(400).json({
        message: 'Please select a valid internship'
      });
    }

    const application = await Application.create({
      name,
      email,
      rollNumber,
      internshipId: internship.id,
      internshipTitle: internship.title
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Invalid application details',
        error: error.message
      });
    }

    console.error(error);

    res.status(500).json({
      message: 'Failed to submit application'
    });
  }
});

app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find().sort({
      createdAt: -1
    });

    res.json(applications);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to retrieve applications'
    });
  }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from the environment');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
}

startServer();
