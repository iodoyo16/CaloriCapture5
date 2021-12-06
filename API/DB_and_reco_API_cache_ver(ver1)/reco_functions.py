import aws_interface
import crawler
import db_functions

def Loss(dris, keys, weights, values):
    loss = 0.0
    for key in keys:
        loss += weights[key]*abs(dris[key] - values[key][0])/abs(dris[key])
    return loss

# dris와의 차이를 Weighted Loss로 계산 Loss가 작은 순으로 자른다.
# 해당 음식의 이름과 MSE pair를 반환한다.
# cutoff가 지정되어있다면, 상위 cutoff개 item들만을 반환한다.
def make_reco_ranks(food_cache, dris, keys, weights, food_list, cutoff=100):
    rank_list = []
    for food in food_list:
        if food not in food_cache:
            info = crawler.crawling(food)
            if info == 0:
                print("[ERROR] Food Not Found")
                continue
            else:
                food_cache[info[0]] = info[1]
        values = food_cache[food]
        loss = Loss(dris, keys, weights, values)
        rank_list.append((food,loss,values))
    return sorted(rank_list, key=lambda x: x[1])[:cutoff]

'''
# DB 사용 version
def make_reco_ranks(client, dris, keys, weights, food_list, cutoff=100):
    rank_list = []
    for food in food_list:
        values = foods_nutriiton(client, [food], keys)
        #print(food, values)
        loss = Loss(dris, keys, weights, values)
        rank_list.append((food,loss,values))
    return sorted(rank_list, key=lambda x: x[1])[:cutoff]
'''
