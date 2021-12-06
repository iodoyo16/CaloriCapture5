import json
import aws_interface
import crawler
import db_functions
import reco_functions

def handler(payload, user):
    cmd = payload.get('cmd')
    query = payload.get('query', 0)
    # DB 누락값 문제로, DB 참조 구조에서 Crawling with Cache 구조로 변경
    #keys = payload.get('keys', ['탄수화물(g)', '단백질(g)', '지방(g)', '에너지(㎉)', '1회제공량'])
    keys = payload.get('keys', ['탄수화물', '단백질', '지방', '칼로리'])
    
    with open('food_cache.json', 'w+') as fp:
        food_cache = json.load(fp)
    
    if cmd == 'reco.add_food': # add one food
        if query in food_cache:
            return "[WARNNING] Food Already Exist"
        else:
            info = crawler.crawling(query)
            if info == 0:
                return "[ERROR] Food Not Found"
            else:
                food_cache[info[0]] = info[1]
                with open('food_cache.json', 'w+') as fp:
                    json.dump(food_cache,fp)
                return ("[SUCCESS] Food Added", info[1])
    
    '''
    # Make Food lists
    main_dish = ["김치찌개", "피자", "양념치킨", "조기구이", "라면", "김치볶음밥", "카레덮밥", "육개장", "된장찌개", "잔치국수", "닭볶음탕", "삼계탕", "불고기", "떡국", "칼국수"]
    # Table ...
    side_dish = ["오곡밥", "배추김치", "멸치볶음", "오징어튀김", "돼지고기장조림", "닭강정", "두부", "마늘쫑무침", "미역국", "콩나물무침", "현미밥"]
    '''
    # recommendation function call
    if cmd == 'reco.make_reco_ranks':
        dris = query.get('dris', {'탄수화물':130, '단백질':65, '지방':50, '칼로리':2600})
        food_set = query.get('food_set', ["김치찌개", "피자", "양념치킨", "조기구이", "라면", "김치볶음밥", "카레덮밥", "육개장", "된장찌개", "잔치국수", "닭볶음탕", "삼계탕", "불고기", "떡국", "칼국수"])
        weights = {'탄수화물':0.2, '단백질':0.3, '지방':0.2, '칼로리':0.3}
        #client = aws_interface.Client()
        rank_list = reco_functions.make_reco_ranks(food_cache, dris, keys, weights, food_set, cutoff=10)
        with open('food_cache.json', 'w+') as fp:
            json.dump(food_cache,fp)
        
        return rank_list
    
    # DB Call을 Cache와 Crawler Base로 사용
    if cmd == 'food.db_find':
        if query in food_cache:
            return food_cache[query]
        else:
            info = crawler.crawling(query)
            if info == 0:
                return "[ERROR] Food Not Found"
            else:
                food_cache[info[0]] = info[1]
                with open('food_cache.json', 'w+') as fp:
                    json.dump(food_cache,fp)
                return ("[SUCCESS] Food Added", info[1])

    if cmd == 'food.foods_nutriiton':
        info_total = {}
        for key in keys:
            info_total[key] = 0.0
        for name in query:
            if query not in food_cache:
                info = crawler.crawling(name)
                if info == 0:
                    print("[ERROR] Food Not Found")
                    continue
                else:
                    food_cache[info[0]] = info[1]
            info = food_cache.get(name, [])
            if info == []: # Food not found
                print("[Warning] Food name \"%s\" not found."%name)
                continue
            for key in keys:
                info_total[key] += info[key][0]
        return info_total

    '''
    # DB function call (추후 DB 개선 후 사용...)
    if cmd == 'food.db_find':
        client = aws_interface.Client()
        return db_functions.db_find(client, query)
    if cmd == 'food.foods_nutriiton':
        client = aws_interface.Client()
        return db_functions.foods_nutriiton(client, query, keys)
    '''
    
    raise BaseException('NO CMD')