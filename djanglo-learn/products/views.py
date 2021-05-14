from django.shortcuts import render, get_object_or_404, redirect
from django.http import Http404
from .models import Product
from .forms import ProductForm, RawProductForm


# Create your views here.

"""
def product_create_view(request):
    form = RawProductForm()
    if request.method == "POST":
        form = RawProductForm(request.POST)
        if form.is_valid():
            print(form.cleaned_data)
            Product.objects.create(**form.cleaned_data)

        else:
            print(form.errors)
    context = {
        "form": form
    }
    return render(request, "products/product_create.html", context)
"""


def product_create_view(request):
    initial_data = {
        "title": "My Title"
    }
    form = ProductForm(request.POST or None,
                       initial=initial_data)
    if form.is_valid():
        form.save()
        form = ProductForm()

    context = {
        "form": form
    }
    return render(request, "products/product_create.html", context)


"""
def product_create_view(request):
    print("GET: ", request.GET)
    print("POST: ", request.POST)
    title = request.POST.get('title')
    # Product.objects.create(title=title)
    context = {}
    return render(request, "products/product_create.html", context)
"""


def product_detail_view(request, id):
    # try:
    #    product = Product.objects.get(id=id)
    # except Product.DoesNotExist:
    #    raise Http404
    product = get_object_or_404(Product, id=id)
    context = {
        "object": product
    }
    return render(request, "products/product_detail.html", context)


def product_update_view(request, id):
    obj = get_object_or_404(Product, id=id)
    form = ProductForm(request.POST or None, instance=obj)
    if request.method == "POST":
        form.save()
    context = {
        "form": form
    }
    return render(request, "products/product_update.html", context)


def product_delete_view(request, id):
    try:
        obj = Product.objects.get(id=id)
        print("delete", request.method)
    except Product.DoesNotExist:
        raise Http404
    # POST request
    if request.method == "POST":
        # confirming delete
        obj.delete()
        return redirect('../../')
    context = {
        "object": obj
    }
    return render(request, "products/product_delete.html", context)


def product_list_view(request):
    queryset = Product.objects.all()
    context = {
        "object_list": queryset
    }
    return render(request, "products/product_list.html", context)
