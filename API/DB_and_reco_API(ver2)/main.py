import json
import aws_interface
import crawler
import db_functions
import reco_functions

def handler(payload, user):
    cmd = payload.get('cmd')
    query = payload.get('query', 0)
    # food DB 누락값 문제로, DB를 food2로 변경
    #keys = payload.get('keys', ['탄수화물(g)', '단백질(g)', '지방(g)', '에너지(㎉)', '1회제공량'])
    keys = payload.get('keys', ['탄수화물', '단백질', '지방', '칼로리'])
    
    if cmd == 'reco.add_food': # add one food
        client = aws_interface.Client()
        return db_functions.db_add(client, query, keys)
    
    # DB function call
    if cmd == 'food.db_find_one':
        client = aws_interface.Client()
        return db_functions.db_find_one(client, query)
    if cmd == 'food.db_find_many':
        client = aws_interface.Client()
        return db_functions.db_find_many(client, query)
    if cmd == 'food.foods_nutriiton':
        client = aws_interface.Client()
        return db_functions.foods_nutrition(client, query, keys)
    
    # Make Food lists
    main_dish = ["김치찌개", "피자", "양념치킨", "조기구이", "라면", "김치볶음밥", "카레덮밥", "육개장", "된장찌개", "잔치국수", "닭볶음탕", "삼계탕", "불고기", "떡국", "칼국수"]
    # Table ...
    side_dish = ["오곡밥", "배추김치", "멸치볶음", "오징어튀김", "돼지고기장조림", "닭강정", "두부", "마늘쫑무침", "미역국", "콩나물무침", "현미밥"]
    
    # recommendation function call
    if cmd == 'reco.make_reco_ranks':
        dris = query.get('dris', {'탄수화물':130, '단백질':65, '지방':50, '칼로리':2600})
        food_set = query.get('food_set', main_dish)
        weights = {'탄수화물':0.2, '단백질':0.3, '지방':0.2, '칼로리':0.3}
        client = aws_interface.Client()
        rank_list = reco_functions.make_reco_ranks(client, dris, keys, weights, food_set, cutoff=10)
        return rank_list
    
    
    raise BaseException('NO CMD')