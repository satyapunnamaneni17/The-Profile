"""
Profile API routes
Contains GET and PUT endpoints for profile data
"""

from flask import Blueprint, request, jsonify
from models import Profile

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile', methods=['GET'])
def get_profile():
    """
    GET /api/profile
    Get the first profile (for single-user profile app)
    """
    try:
        profile = Profile.get_first()
        if profile:
            return jsonify(profile.to_dict()), 200
        else:
            return jsonify([]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@profile_bp.route('/profile', methods=['PUT'])
def update_profile():
    """
    PUT /api/profile
    Update an existing profile or create if not exists
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Get existing profile
        existing = Profile.get_first()
        
        if existing:
            # Update existing profile
            for key, value in data.items():
                if hasattr(existing, key):
                    setattr(existing, key, value)
            updated = existing.save()
            return jsonify(updated.to_dict()), 200
        else:
            # Create new profile
            profile = Profile(**data)
            profile.save()
            return jsonify(profile.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@profile_bp.route('/profile', methods=['POST'])
def create_profile():
    """
    POST /api/profile
    Create a new profile
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Check if profile already exists
        existing = Profile.get_first()
        if existing:
            return jsonify({'error': 'Profile already exists. Use PUT to update.'}), 409
        
        # Create new profile
        profile = Profile(**data)
        profile.save()
        return jsonify(profile.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@profile_bp.route('/profiles', methods=['GET'])
def get_all_profiles():
    """
    GET /api/profiles
    Get all profiles (for admin/multiple users)
    """
    try:
        limit = request.args.get('limit', 10, type=int)
        offset = request.args.get('offset', 0, type=int)
        
        profiles = Profile.get_all(limit=limit, offset=offset)
        return jsonify([p.to_dict() for p in profiles]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
