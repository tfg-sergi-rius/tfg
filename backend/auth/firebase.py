import json
import os
from pathlib import Path

import firebase_admin
from firebase_admin import credentials


def init_firebase() -> None:
    if not firebase_admin._apps:
        service_account_env = os.getenv("FIREBASE_SERVICE_ACCOUNT")
        if service_account_env:
            cred = credentials.Certificate(json.loads(service_account_env))
        else:
            service_account_path = Path(__file__).resolve().parent.parent / "serviceAccountKey.json"
            cred = credentials.Certificate(str(service_account_path))
        firebase_admin.initialize_app(cred)