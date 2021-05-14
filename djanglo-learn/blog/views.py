from django.shortcuts import render, get_object_or_404
from .models import Article
from .forms import ArticleModelForm
from django.urls import reverse
from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView
)

# Create your views here.

"""
def article_list_view(request):
    queryset = Article.objects.all()
    context = {
        "blog_list": queryset
    }
    return render(request, "blog/blog_list.html", context)
"""


class ArticleCreateView(CreateView):
    template_name = "blog/blog_create.html"
    form_class = ArticleModelForm
    queryset = Article.objects.all()
    # success_url = "/"

    def form_valid(self, form):
        print(form.cleaned_data)
        return super().form_valid(form)


class ArticleListView(ListView):
    template_name = "blog/blog_list.html"
    queryset = Article.objects.all()


class ArticleDetailView(DetailView):
    template_name = "blog/blog_detail.html"
    # queryset = Article.objects.all()

    def get_object(self):
        id_ = self.kwargs.get("id")
        return get_object_or_404(Article, id=id_)


class ArticleCreateView(CreateView):
    template_name = "blog/blog_create.html"
    form_class = ArticleModelForm
    # queryset = Article.objects.all()
    # success_url = "/"

    def form_valid(self, form):
        print(form.cleaned_data)
        return super().form_valid(form)


class ArticleUpdateView(UpdateView):
    template_name = "blog/blog_create.html"
    form_class = ArticleModelForm
    # queryset = Article.objects.all()
    # success_url = "/"

    def get_object(self):
        id_ = self.kwargs.get("id")
        return get_object_or_404(Article, id=id_)

    def form_valid(self, form):
        print(form.cleaned_data)
        return super().form_valid(form)


class ArticleDeleteView(DeleteView):
    template_name = "blog/blog_delete.html"
    # queryset = Article.objects.all()
    # success_url = "/blog"

    def get_object(self):
        id_ = self.kwargs.get("id")
        return get_object_or_404(Article, id=id_)

    def get_success_url(self):
        return reverse("blog:article-list")
