from services.groq_client import client

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {
            "role": "user",
            "content": "Say SentinelNet online"
        }
    ]
)

print(response.choices[0].message.content)