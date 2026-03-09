from sqlmodel import SQLModel, Field
import uuid


class Recommendation(SQLModel, table=True):

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)

    data: str