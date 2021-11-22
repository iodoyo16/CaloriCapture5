import db_functions
import aws_interface
def handler(payload, user):
    cmd = payload.get('cmd')
    query = payload.get('query', 0)
    keys = payload.get('keys', ['탄수화물(g)', '단백질(g)', '지방(g)', '에너지(㎉)', '1회제공량'])
     
    if cmd == 'food.db_find':
        client = aws_interface.Client()
        return db_functions.db_find(client, query)
    if cmd == 'food.foods_nutriiton':
        client = aws_interface.Client()
        return db_functions.foods_nutriiton(client, query, keys)
    
    raise BaseException('NO CMD')