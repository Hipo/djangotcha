from django.conf.urls import url, include, patterns
from django.contrib import admin
from gotcha.views import BenchmarkDashboard

urlpatterns = patterns('',
    # Admin
    url(r'^admin/gotcha/$', BenchmarkDashboard.as_view(), name="gotcha-benchmark"),
    (r'^admin/', include(admin.site.urls)),
)