from django.conf.urls import url, include, patterns
from django.contrib import admin

from .views import BenchmarkDashboard, UrlRetrieve

urlpatterns = patterns('',
    # Admin
    url(r'^gotcha/$', BenchmarkDashboard.as_view(), name="gotcha-benchmark"),
    url(r'^gotcha/(?P<url_id>[a-z_0-9]+)$', UrlRetrieve.as_view(), name="gotcha-benchmark"),
)