from django.contrib.auth.decorators import user_passes_test
from django.utils.decorators import method_decorator
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.views.generic.base import View


class BenchmarkDashboard(View):
    @method_decorator(user_passes_test(lambda user: user.is_superuser, login_url='/admin'))
    def dispatch(self, request, *args, **kwargs):
        return super(BenchmarkDashboard, self).dispatch(request, args, kwargs)

    def get(self, request, *args, **kwargs):
        return render(request, 'djangotcha/gotcha.html', {})


class UrlRetrieve(View):
    @method_decorator(user_passes_test(lambda user: user.is_superuser, login_url='/admin'))
    def dispatch(self, request, *args, **kwargs):
        return super(UrlRetrieve, self).dispatch(request, args, kwargs)

    def get(self, request, *args, **kwargs):
        return render(request, 'djangotcha/chart_gotcha.html', {'url_id': self.kwargs['url_id']})
