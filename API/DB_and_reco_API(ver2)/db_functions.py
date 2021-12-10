import aws_interface
import crawler

def db_find_one(client, name):
    query = aws_interface.Query('eq', '식품명', name)
    response = client.call_api("cloud.database.query_items", {
        "partition": "food2",
        "query": query,
        "session_id": "str"
    })
    return response['items']

def db_find_many(client, names):
    query = aws_interface.Query('eq', '식품명', names[0])
    for name in names[1:]:
        query.add_or('eq', '식품명', name)
    response = client.call_api("cloud.database.query_items", {
        "partition": "food2",
        "query": query,
        "session_id": "str"
    })
    return response['items']

def db_add(client, name, keys):
    if not db_find_one(client, name) == []:
        return 0 # item already exist
    info = crawler.crawling(name, keys)
    if info == 0:
        return -1
    response = client.call_api("cloud.database.create_item", {
    "item": info,
    "partition": "food2",
    "session_id": "str"
    })
    return response
def info_filtering(info, keys):
    filtered = {}
    for key in keys:
        val = info.get(key, 0)
        if val == 0:
            return {"Error" : "key not found"}
        filtered[key] = val
    return filtered

def foods_nutrition(client, names, keys):
    info_total = {}
    for key in keys:
        info_total[key] = 0.0
    infos = db_find_many(client, names)
    if infos == []: # Food not found
        return {"Error" : "food not found"}
    # average infos
    for info in infos:
        for key in keys:
            info_total[key] += float(info[key][0])
    return info_total