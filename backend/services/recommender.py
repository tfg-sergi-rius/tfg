from openai import OpenAI
import json


def generate_recommendations(data):
    client = OpenAI()

    prompt = f"""
    Sugiere 5 ideas de TFG para un estudiante con estas caracteristicas:

    Carrera: {data.carrera}
    Area de interes: {data.area}
    Tecnologias preferidas: {", ".join(data.tecnologias)}
    Dificultad: {data.dificultad}
    Intereses: {data.interes}

    Devuelve SOLO un JSON con este formato:

    [
      {{
        "title": "titulo del proyecto",
        "description": "descripcion breve",
        "technologies": ["tech1","tech2"]
      }}
    ]
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,  # ajustar segun la precision que se quiera
        max_tokens=500
    )

    content = response.choices[0].message.content
    content = content.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(content)
    except Exception:
        return [{
            "title": "Error generando recomendacion",
            "description": content,
            "technologies": []
        }]


def generate_random_recommendation():
    client = OpenAI()

    prompt = """
    Sugiere UNA idea original de TFG de informatica de forma aleatoria.

    Devuelve SOLO un JSON con este formato:

    {
      "title": "titulo del proyecto",
      "description": "descripcion breve",
      "technologies": ["tech1", "tech2"]
    }
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=1,
        max_tokens=300
    )

    content = response.choices[0].message.content
    content = content.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(content)
    except Exception:
        return {
            "title": "Error generando recomendacion aleatoria",
            "description": content,
            "technologies": []
        }
