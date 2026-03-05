"""
Database models for Profile
"""

from database import get_db_connection, deserialize_json, serialize_json
from datetime import datetime

class Profile:
    """Profile model class"""
    
    def __init__(self, id=None, name=None, bio=None, location=None, avatar_url=None, 
                 resume_url=None, open_to_work=False, skills=None, social_links=None,
                 experience=None, education=None, certifications=None, projects=None,
                 created_date=None, updated_date=None):
        self.id = id
        self.name = name
        self.bio = bio
        self.location = location
        self.avatar_url = avatar_url
        self.resume_url = resume_url
        self.open_to_work = open_to_work
        self.skills = skills or []
        self.social_links = social_links or {}
        self.experience = experience or []
        self.education = education or []
        self.certifications = certifications or []
        self.projects = projects or []
        self.created_date = created_date
        self.updated_date = updated_date
    
    @staticmethod
    def from_row(row):
        """Create Profile object from database row"""
        if row is None:
            return None
        
        return Profile(
            id=row['id'],
            name=row['name'],
            bio=row['bio'],
            location=row['location'],
            avatar_url=row['avatar_url'],
            resume_url=row['resume_url'],
            open_to_work=bool(row['open_to_work']),
            skills=deserialize_json(row['skills']),
            social_links=deserialize_json(row['social_links']),
            experience=deserialize_json(row['experience']),
            education=deserialize_json(row['education']),
            certifications=deserialize_json(row['certifications']),
            projects=deserialize_json(row['projects']),
            created_date=row['created_date'],
            updated_date=row['updated_date']
        )
    
    def to_dict(self):
        """Convert Profile to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'bio': self.bio,
            'location': self.location,
            'avatar_url': self.avatar_url,
            'resume_url': self.resume_url,
            'open_to_work': self.open_to_work,
            'skills': self.skills,
            'social_links': self.social_links,
            'experience': self.experience,
            'education': self.education,
            'certifications': self.certifications,
            'projects': self.projects,
            'created_date': self.created_date,
            'updated_date': self.updated_date
        }
    
    @classmethod
    def get_all(cls, limit=10, offset=0):
        """Get all profiles"""
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            'SELECT * FROM profiles ORDER BY created_date DESC LIMIT ? OFFSET ?',
            (limit, offset)
        )
        rows = cursor.fetchall()
        conn.close()
        return [cls.from_row(row) for row in rows]
    
    @classmethod
    def get_by_id(cls, profile_id):
        """Get profile by ID"""
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM profiles WHERE id = ?', (profile_id,))
        row = cursor.fetchone()
        conn.close()
        return cls.from_row(row)
    
    @classmethod
    def get_first(cls):
        """Get the first profile (for single-user profile app)"""
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM profiles ORDER BY created_date DESC LIMIT 1')
        row = cursor.fetchone()
        conn.close()
        return cls.from_row(row)
    
    def save(self):
        """Save profile to database (create or update)"""
        conn = get_db_connection()
        cursor = conn.cursor()
        now = datetime.now().isoformat()
        
        if self.id:
            # Update existing profile
            cursor.execute('''
                UPDATE profiles SET
                    name = ?, bio = ?, location = ?, avatar_url = ?, resume_url = ?,
                    open_to_work = ?, skills = ?, social_links = ?, experience = ?,
                    education = ?, certifications = ?, projects = ?, updated_date = ?
                WHERE id = ?
            ''', (
                self.name, self.bio, self.location, self.avatar_url, self.resume_url,
                1 if self.open_to_work else 0, serialize_json(self.skills), 
                serialize_json(self.social_links), serialize_json(self.experience),
                serialize_json(self.education), serialize_json(self.certifications),
                serialize_json(self.projects), now, self.id
            ))
            conn.commit()
            conn.close()
            return self
        else:
            # Create new profile
            cursor.execute('''
                INSERT INTO profiles (
                    name, bio, location, avatar_url, resume_url, open_to_work,
                    skills, social_links, experience, education, certifications, projects,
                    created_date, updated_date
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                self.name, self.bio, self.location, self.avatar_url, self.resume_url,
                1 if self.open_to_work else 0, serialize_json(self.skills),
                serialize_json(self.social_links), serialize_json(self.experience),
                serialize_json(self.education), serialize_json(self.certifications),
                serialize_json(self.projects), now, now
            ))
            conn.commit()
            self.id = cursor.lastrowid
            conn.close()
            return self
    
    @classmethod
    def create_or_update(cls, profile_data):
        """Create a new profile or update existing one"""
        # Try to get existing profile
        existing = cls.get_first()
        
        if existing:
            # Update existing profile
            for key, value in profile_data.items():
                if hasattr(existing, key):
                    setattr(existing, key, value)
            existing.save()
            return existing
        else:
            # Create new profile
            profile = cls(**profile_data)
            profile.save()
            return profile
    
    @classmethod
    def delete(cls, profile_id):
        """Delete a profile"""
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM profiles WHERE id = ?', (profile_id,))
        conn.commit()
        conn.close()
