print("Starting table creation...")

from services.db import engine
from models.threat import Threat
from services.db import Base

print("Imports successful...")

Base.metadata.create_all(bind=engine)

print("Tables created successfully.")