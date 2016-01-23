from django.conf.urls import url, include, patterns
from django.contrib import admin
from views import BenchmarkDashboard

urlpatterns = patterns('',
    # Admin
    url(r'^admin/benchmark/$', BenchmarkDashboard.as_view(), name="gotcha-benchmark"),
    (r'^admin/', include(admin.site.urls)),
)