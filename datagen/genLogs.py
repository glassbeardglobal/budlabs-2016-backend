import requests
import random

lat = 40.1106
lon = 88.2073
conversion = 1 / 55.2428
radius = 75

for i in range(1):
  d = {
    'latitude': lat + (random.random()*2-1)*radius*conversion,
    'longitude': lon + (random.random()*2-1)*radius*conversion}
  r = requests.post('http://barleynet.herokuapp.com/api/location', data=d)
  print(r)
  print(r.json())