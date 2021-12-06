import aws_interface
def db_find(client, name):
    query = aws_interface.Query('eq', '식품명', name)
    response = client.call_api("cloud.database.query_items", {
        "partition": "food",
        "query": query,
        "session_id": "str"
    })
    return response['items']
	
def info_filtering(info, keys):
    filtered = {}
    for key in keys:
        val = info.get(key, 0)
        if val == 0:
            return {"Error" : "key not found"}
        filtered[key] = val
    return filtered

def foods_nutriiton(client, names, keys):
    info_total = {}
    for key in keys:
        info_total[key] = 0.0
    for name in names:
        infos = db_find(client, name)
        if infos == []: # Food not found
            print("[Warning] Food name \"%s\" not found."%name)
            continue
        info_avg = {}
        for key in keys:
            info_avg[key] = 0.0
        # average infos
        for info in infos:
            filtered_info = info_filtering(info,keys)
            for key in keys:
                info_avg[key] += float(filtered_info[key])
        for key in keys:
            info_total[key] += info_avg[key]/len(infos)
    return info_total