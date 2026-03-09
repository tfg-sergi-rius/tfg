from openai import OpenAI
import json

client = OpenAI()

def generate_recommendations(data):

    prompt = f"""
    Sugiere 5 ideas de TFG para un estudiante con estas características:

    Carrera: {data.carrera}
    Área de interés: {data.area}
    Tecnologías preferidas: {", ".join(data.tecnologias)}
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
        temperature=0.7,
        max_tokens=500
    )

    content = response.choices[0].message.content

    content = content.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(content)
    except:
        return [{
            "title": "Error generando recomendación",
            "description": content,
            "technologies": []
        }]