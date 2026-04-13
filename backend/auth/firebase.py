from pathlib import Path

import firebase_admin
from firebase_admin import credentials

_service_account_path = Path(__file__).resolve().parent.parent / "serviceAccountKey.json"


def init_firebase() -> None:
    if not firebase_admin._apps:
        cred = credentials.Certificate(str(_service_account_path))
        firebase_admin.initialize_app(cred)