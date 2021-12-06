import requests
from bs4 import BeautifulSoup
def parsing(str):
    for idx, s in enumerate(str):
        if s.isalpha():
            return (float(str[0:idx]), str[idx:])

def crawling(name, keys):
    base_url = "https://www.fatsecret.kr/칼로리-영양소/search?q="
    url = base_url + name
    req = requests.get(url)
    html = req.text
    soup = BeautifulSoup(html,"html.parser")
    infos = soup.find_all("div", "smallText greyText greyLink")
    if infos == []:
        return 0
    infos = str(infos)
    infos = infos.split("\n")[1]
    ret = {}
    ret["식품명"] = name
    for key in keys:
        s = infos[infos.find(key):].split("|")[0].split(":")[1].replace(" ","").replace("\r","")
        ret[key] = parsing(s)
    return ret