"""
Database initialization and connection
Uses SQLAlchemy ORM with SQLite (can be switched to PostgreSQL/MySQL)
"""

import sqlite3
import json
import os
from datetime import datetime

# Database file path
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, 'profile.db')

def get_db_connection():
    """Get a database connection"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database with required tables"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create profiles table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            bio TEXT,
            location TEXT,
            avatar_url TEXT,
            resume_url TEXT,
            open_to_work INTEGER DEFAULT 0,
            skills TEXT DEFAULT '[]',
            social_links TEXT DEFAULT '{}',
            experience TEXT DEFAULT '[]',
            education TEXT DEFAULT '[]',
            certifications TEXT DEFAULT '[]',
            projects TEXT DEFAULT '[]',
            created_date TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_date TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()
    print(f"Database initialized at: {DB_PATH}")

def serialize_json(data):
    """Serialize data to JSON string"""
    if data is None:
        return None
    if isinstance(data, (list, dict)):
        return json.dumps(data)
    return data

def deserialize_json(data):
    """Deserialize JSON string to Python object"""
    if data is None:
        return None
    if isinstance(data, (list, dict)):
        return data
    try:
        return json.loads(data)
    except (json.JSONDecodeError, TypeError):
        return data
