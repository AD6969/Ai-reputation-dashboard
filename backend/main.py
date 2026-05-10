from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import random

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOAD JSON
with open("../data/reviews.json", "r", encoding="utf-8") as file:
    reviews = json.load(file)

# SENTIMENT WORDS
positive_words = [
    "great",
    "amazing",
    "excellent",
    "awesome",
    "good",
    "friendly",
    "love",
    "fantastic",
]

negative_words = [
    "bad",
    "terrible",
    "worst",
    "slow",
    "poor",
    "rude",
    "dirty",
]

# TOPICS
topics_map = {
    "food": ["food", "taste", "dish"],
    "service": ["service", "staff"],
    "ambience": ["ambience", "decor", "atmosphere"],
}

# REPLIES
positive_replies = [
    "Thank you for your wonderful feedback. We're delighted you enjoyed your experience.",
    "We truly appreciate your support and kind words.",
    "Your positive review means a lot to our team.",
]

negative_replies = [
    "We sincerely apologize for your experience. We'll work on improving our service.",
    "Thank you for bringing this issue to our attention. We'll address it immediately.",
    "We're sorry for the inconvenience caused and appreciate your feedback.",
]

neutral_replies = [
    "Thank you for sharing your feedback.",
    "We appreciate your review and support.",
]

# SENTIMENT
def analyze_sentiment(text):

    text = text.lower()

    positive_score = sum(
        word in text for word in positive_words
    )

    negative_score = sum(
        word in text for word in negative_words
    )

    if positive_score > negative_score:
        return "positive"

    elif negative_score > positive_score:
        return "negative"

    return "neutral"

# EMOTION
def detect_emotion(text):

    text = text.lower()

    if any(word in text for word in positive_words):
        return "happy"

    if any(word in text for word in negative_words):
        return "frustrated"

    return "neutral"

# PRIORITY
def detect_priority(text):

    text = text.lower()

    high_priority = [
        "worst",
        "terrible",
        "dirty",
        "refund",
        "rude",
    ]

    if any(word in text for word in high_priority):
        return "high"

    if "slow" in text or "bad" in text:
        return "medium"

    return "low"

# TOPICS
def detect_topics(text):

    text = text.lower()

    detected = []

    for topic, keywords in topics_map.items():

        if any(word in text for word in keywords):
            detected.append(topic)

    return detected

# AI REPLY
def generate_reply(sentiment):

    if sentiment == "positive":
        return random.choice(positive_replies)

    elif sentiment == "negative":
        return random.choice(negative_replies)

    return random.choice(neutral_replies)

# ROOT
@app.get("/")
def home():
    return {
        "message": "Backend Running"
    }

# REVIEWS API
@app.get("/reviews")
def get_reviews():

    processed = []

    for index, review in enumerate(reviews):

        sentiment = analyze_sentiment(
            review["review"]
        )

        processed.append({
            "id": index + 1,
            "review": review["review"],
            "rating": review["rating"],
            "source": review["source"],
            "sentiment": sentiment,
            "emotion": detect_emotion(
                review["review"]
            ),
            "priority": detect_priority(
                review["review"]
            ),
            "topics": detect_topics(
                review["review"]
            ),
            "reply": generate_reply(
                sentiment
            )
        })

    return processed