import requests
from bs4 import BeautifulSoup
def parsing(str):
    for idx, s in enumerate(str):
        if not s.isnumeric() :
            return (int(float(str[0:idx])), str[idx:])

def crawling(name):
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
    kcal = infos[infos.find("칼로리"):].split("|")[0]
    tan = infos[infos.find("탄수화물"):].split("|")[0]
    dan = infos[infos.find("단백질"):].split("|")[0]
    zi = infos[infos.find("지방"):].split("|")[0]
    info = {}
    info['칼로리'] = parsing(kcal)
    info['탄수화물'] = parsing(tan)
    info['단백질'] = parsing(dan)
    info['지방'] = parsing(zi)
    return (name, info)