# Profile Application

A full-stack profile management application with React frontend and Python Flask backend.


🚀 **Live Demo:** https://the-profile-two.vercel.app



## Project Description

This project is a full-stack profile application that allows candidates to showcase their professional profile including skills, education, certifications, and projects. It also provides a recruiter-friendly quick view for faster candidate evaluation.


## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Python Flask RESTful API
- **Database**: SQLite (can be switched to PostgreSQL/MySQL)

## Project Structure

```
.
├── backend/
│   ├── config.py          # Database configuration
│   ├── database.py        # Database initialization
│   ├── main.py            # Flask application entry point
│   ├── models.py          # Profile data models
│   ├── requirements.txt   # Python dependencies
│   └── routes/
│       ├── __init__.py
│       └── profile_routes.py  # API endpoints
├── src/
│   ├── api/
│   │   └── base44Client.js    # API client
│   ├── components/
│   │   ├── profile/            # Profile components
│   │   └── ui/                 # UI components
│   ├── lib/
│   │   └── utils.js            # Utility functions
│   ├── pages/
│   │   └── Profile.jsx         # Main profile page
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

### Backend (Python Flask)

1. Navigate to the backend directory:
   
```
bash
   cd backend
   
```

2. Create a virtual environment (optional but recommended):
   
```
bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
```

3. Install dependencies:
   
```
bash
   pip install -r requirements.txt
   
```

4. Run the backend server:
   
```
bash
   python main.py
   
```

   The backend will start on http://localhost:5000

### Frontend (React)

1. Install dependencies:
   
```
bash
   npm install
   
```

2. Run the development server:
   
```
bash
   npm run dev
   
```

   The frontend will start on http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/profile | Get the profile |
| PUT | /api/profile | Update the profile |
| POST | /api/profile | Create a new profile |
| GET | /api/profiles | Get all profiles (admin) |

## Profile Data Structure

```json
{
  "name": "John Doe",
  "bio": "Software Developer",
  "location": "San Francisco, CA",
  "avatar_url": "https://...",
  "resume_url": "https://...",
  "open_to_work": true,
  "skills": ["React", "Python", "SQL"],
  "social_links": {
    "linkedin": "https://linkedin.com/...",
    "github": "https://github.com/...",
    "twitter": "https://twitter.com/...",
    "website": "https://...",
    "email": "john@example.com"
  },
  "experience": [
    {
      "company": "Tech Corp",
      "role": "Senior Developer",
      "duration": "Jan 2020 - Present",
      "description": "..."
    }
  ],
  "education": [
    {
      "degree": "B.Tech",
      "field": "Computer Science",
      "institution": "University Name",
      "start_year": "2016",
      "end_year": "2020",
      "grade": "9.5"
    }
  ],
  "certifications": [
    {
      "name": "AWS Certified Developer",
      "organization": "Amazon",
      "year": "2023",
      "credential_url": "https://..."
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description",
      "tech": "React, Node.js",
      "link": "https://..."
    }
  ]
}
```
## Innovation Feature

### Dual Profile View (Candidate View & Recruiter View)

This project introduces a Dual Profile View feature designed to improve the experience for both candidates and recruiters.

The Candidate Detailed View displays complete information including education, certifications, projects, skills, and experience. This allows candidates to present their full professional profile.

The Recruiter Quick View provides a simplified version of the profile that highlights only the most important hiring-related information such as key skills, major projects, and contact links.

### Why this Innovation?

Recruiters usually spend very little time reviewing each profile. A long profile can make it difficult to quickly identify important information. The Recruiter Quick View solves this problem by presenting only the most relevant details in a concise format.

This innovation improves usability by allowing recruiters to evaluate candidates faster while still keeping the full detailed profile available when needed.

## Deployment

The application is deployed using modern cloud platforms to make it accessible online.

Frontend: https://the-profile-two.vercel.app  
Backend API: https://the-profile.onrender.com/api/profile

Note: The backend is hosted on the Render free tier. The service may take a few seconds to respond on the first request because the server wakes up from sleep after inactivity.

## Development

- Frontend runs on port 5173 (Vite)
- Backend runs on port 5000 (Flask)
- API proxy is configured in vite.config.js to forward /api requests to the backend




## Author

Punnamaneni Jaya Siva Sankara Satyanarayana
Full Stack Developer  
GitHub: https://github.com/satyapunnamaneni17
LinkedIn: https://www.linkedin.com/in/jaya-siva-sankara-satyanarayana-punnamaneni/