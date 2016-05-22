import os

from setuptools import find_packages, setup

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as readme:
    README = readme.read()

setup(
    name='djangotcha',
    version='0.0.1',
    packages=find_packages(),
    include_package_data=True,
    url='https://github.com/Hipo/djangotcha',
    license='MIT',
    author='umitdincel',
    author_email='dincelumit@gmail.com',
    description='API Benchmark Tool for Django',
    long_description=README,
    classifiers=(
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
    ),
)
