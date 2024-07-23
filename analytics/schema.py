from typing import List, Dict, Optional
from pydantic import BaseModel
import json


class Review(BaseModel):
    date: str
    difficulty: float
    grade: str
    quality: float
    tags: List[str]

class Course(BaseModel):
    name: str
    code: str

class Professor(BaseModel):
    firstname: str
    lastName: str
    rmpId: str | None = None
    reviews: List[Review] | None = []
    courses: Dict[str, Course] | None = {}

class School(BaseModel):
    name: str
    professors: List[Professor]
    courses: List[Course]

def parse_json_file(file_path: str) -> School:
    with open(file_path, 'r') as file:
        data = json.load(file)
    return School(**data)