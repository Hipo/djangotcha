from django import template
from django.conf import settings

register = template.Library()

@register.simple_tag
def get_gotcha_application_id():
    """
    Returns the your application id of gotcha from settings.
    Example:
        GOTCHA_APP_ID = '5ads213klsa12kas12fb'
    """
    return settings.GOTCHA_APP_ID


@register.simple_tag
def get_gotcha_token():
    """
    Returns the your token of gotcha from settings.
    Example:
        GOTCHA_TOKEN = 'asd1230asldalasd912'
    """
    return settings.GOTCHA_TOKEN
