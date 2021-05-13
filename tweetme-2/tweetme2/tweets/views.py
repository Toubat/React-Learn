from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse

from .models import Tweet

# Create your views here.


def home_view(request, *args, **kwargs):
    # return HttpResponse("<h1>Hello World</h1>")
    return render(request, "pages/home.html", context={}, status=200)


def tweet_list_view(request, *args, **kwargs):
    queryset = Tweet.objects.all()
    tweets_list = [{"id": x.id, "content": x.content} for x in queryset]
    data = {"response": tweets_list}
    return JsonResponse(data)


def tweet_detail_view(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    Comsume by JavaScript 
    return json data
    """
    data = {
        "id": tweet_id,
    }
    status = 200

    try:
        tweet = Tweet.objects.get(id=tweet_id)
        data['content'] = tweet.content
    except:
        data['message'] = "Not found"
        status = 404
        raise Http404

    return JsonResponse(data, status=status)
