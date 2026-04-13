from openai import OpenAI
import json


def generate_questions(career: str) -> list[dict]:
    client = OpenAI()

    prompt = f"""
        Ets un expert en orientació acadèmica universitària.
        Un estudiant cursa la carrera de: {career}

        La teva tasca és generar exactament 5 preguntes personalitzades per recomanar-li el TFG més adequat.

        Les preguntes han de:
        - Estar adaptades específicament a la carrera indicada
        - Explorar: interessos temàtics, habilitats, preferència teòrica/pràctica, motivacions professionals i experiències prèvies
        - Ser clares i fàcils d'entendre
        - Tenir un màxim de 15 paraules cadascuna
        - Ser directes i concretes, sense enumerar exemples dins la pregunta

        Torna NOMÉS un JSON amb aquest format (sense cap text addicional):
        [
        {{"id": "q1", "question": "..."}},
        {{"id": "q2", "question": "..."}},
        {{"id": "q3", "question": "..."}},
        {{"id": "q4", "question": "..."}},
        {{"id": "q5", "question": "..."}}
        ]
    """

    response = client.chat.completions.create(
        model="gpt-5.4",
        messages=[{"role": "user", "content": prompt}],
        max_completion_tokens=500
    )

    content = response.choices[0].message.content
    content = content.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(content)
    except Exception:
        return [{"id": f"q{i+1}", "question": f"Pregunta {i+1}"} for i in range(5)]


def generate_recommendations(career: str, qa_pairs: list[dict]) -> list[dict]:
    client = OpenAI()

    qa_text = "\n".join(
        f"- {pair['question']}: {pair['answer']}"
        for pair in qa_pairs
    )

    prompt = f"""
    Suggereix 5 idees de TFG per a un estudiant amb aquestes característiques:

    Carrera: {career}

    Respostes al qüestionari:
    {qa_text}

    Torna NOMÉS un JSON amb aquest format (sense cap text addicional):
    [
      {{
        "title": "títol del projecte",
        "description": "descripció breu",
        "technologies": ["tech1", "tech2"]
      }}
    ]
    """

    response = client.chat.completions.create(
        model="gpt-5.4",
        messages=[{"role": "user", "content": prompt}],
        max_completion_tokens=800
    )

    content = response.choices[0].message.content
    content = content.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(content)
    except Exception:
        return [{
            "title": "Error generant recomanació",
            "description": content,
            "technologies": []
        }]


def elaborate_recommendation(title: str, description: str, technologies: list[str]) -> dict:
    client = OpenAI()

    prompt = f"""
    Ets un expert en orientació de TFG universitaris. Desglossa en detall el següent projecte.

    Títol: {title}
    Descripció: {description}
    Tecnologies: {", ".join(technologies)}

    Retorna un JSON amb exactament aquesta estructura. Tots els camps han de tenir contingut real i concret:
    {{
      "summary": "Escriu aquí una descripció ampliada del projecte en 3-4 frases explicant l'abast, l'objectiu i el valor del treball.",
      "phases": [
        "Fase 1: <descripció real de la primera fase d'aquest projecte concret>",
        "Fase 2: <descripció real de la segona fase>",
        "Fase 3: <descripció real de la tercera fase>",
        "Fase 4: <descripció real de la quarta fase>"
      ],
      "challenges": [
        "<repte tècnic o metodològic real i concret d'aquest projecte>",
        "<segon repte real i concret>",
        "<tercer repte real i concret>"
      ],
      "resources": [
        "<tecnologia o recurs clau real 1>",
        "<tecnologia o recurs clau real 2>",
        "<tecnologia o recurs clau real 3>"
      ]
    }}

    Respon NOMÉS amb el JSON. Cap text addicional fora del JSON.
    """

    response = client.chat.completions.create(
        model="gpt-5.4",
        messages=[{"role": "user", "content": prompt}],
        max_completion_tokens=1500
    )

    content = response.choices[0].message.content
    content = content.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(content)
    except Exception:
        return {
            "summary": description,
            "phases": [],
            "challenges": [],
            "resources": technologies
        }


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
        model="gpt-5.4",
        messages=[{"role": "user", "content": prompt}],
        max_completion_tokens=300
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
