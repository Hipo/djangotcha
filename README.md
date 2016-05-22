# DJANGOTCHA

API Benchmark Tool for Django

### Setting up

```
pip install djangotcha
```

add gotcha url to your urls.py

```
urlpatterns = [
    ...
    url(r'^admin/', include('djangotcha.urls')),
    ...
]
```


and then add it to your installed apps:

```
INSTALLED_APPS = (
    ...
    'djangotcha',
    ...
)
```


Add necessary Gotcha keys to settings.py of the django project:
```
GOTCHA_APPLICATION_ID = ''
GOTCHA_TOKEN = ''
```