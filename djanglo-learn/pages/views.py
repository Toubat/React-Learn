from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def home_view(request, *args, **kwargs):
    print(request.user)
    # return HttpResponse("<h1>Hello World</h1>")
    return render(request, "home.html", {})


def contact_view(request, *args, **kwargs):
    context = {
        "text": "This is about us",
        "number": 123,
        "bool": True,
        "list": [123, 4134, 341, 343, 3412, 1, "ABC"]
    }
    return render(request, "contact.html", context)
