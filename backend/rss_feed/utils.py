# rss_feed/utils.py

import feedparser
from .models import Article

def fetch_and_store_articles(feed_url):
    feed = feedparser.parse(feed_url)
    for entry in feed.entries:
        Article.objects.create(
            title=entry.title,
            description=entry.description,
            link=entry.link
        )