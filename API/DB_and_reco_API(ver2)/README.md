# DB_and_reco_API

## 쿼리 사용방법

### 1. DB에 item 추가
#### input
```
{"cmd":"reco.add_food", "query":"삼계탕"}
```
#### return
1-1. 이미 item이 DB에 있는 경우 
```
{
    "response": 0,
    "stdout": "",
    "duration": 0.6482312679290771
}
```
1-2. 새롭게 item이 추가된 경우
```
{
    "response": {
        "item_id": "fkTdGDYiv9n8TSBvDnahR9",
        "duration": 0.10902142524719238
    },
    "stdout": "",
    "duration": 1.475827693939209
}
```
1-3. item 이름이 잘못된 경우
```
{
    "response": -1,
    "stdout": "",
    "duration": 2.1468679904937744
}
```

### 2. DB에 음식 1개 영양정보 검색
#### input
```
{"cmd":"food.db_find_one", "query":"총각김치"}
```
#### output
2-1. DB에 해당 음식이 없는 경우
```
{
    "response": [],
    "stdout": "",
    "duration": 0.6132454872131348
}
```
2-2. DB에 해당 음식이 있는 경우
```
{
    "response": [
        {
            "지방": [
                0.1,
                "g"
            ],
            "단백질": [
                0.47,
                "g"
            ],
            "owner": null,
            "partition": "food2",
            "탄수화물": [
                2.35,
                "g"
            ],
            "id": "ijqRFErREyQz2yMpAupxDo",
            "식품명": "총각김치",
            "칼로리": [
                11,
                "kcal"
            ],
            "creation_date": 1638775229.7721517
        }
    ],
    "stdout": "",
    "duration": 1.4439098834991455
}
```

### 3. DB에 음식 여러개 영양정보 검색
#### input
```
{"cmd":"food.db_find_many", "query":["조미김", "돈코츠라멘", "배추김치"]}
```
#### output
> DB에 존재하는 음식 정보만 반환함
```
{
    "response": [
        {
            "지방": [
                0.12,
                "g"
            ],
            "단백질": [
                0.66,
                "g"
            ],
            "owner": null,
            "partition": "food2",
            "탄수화물": [
                1.58,
                "g"
            ],
            "id": "6cT9dx7KXTRFJmpKPsM5GK",
            "식품명": "배추김치",
            "칼로리": [
                8,
                "kcal"
            ],
            "creation_date": 1638773219.9340997
        },
        {
            "지방": [
                1.91,
                "g"
            ],
            "단백질": [
                0.68,
                "g"
            ],
            "owner": null,
            "partition": "food2",
            "탄수화물": [
                1.55,
                "g"
            ],
            "id": "8exntPjbfqWMc9BHjfDUzD",
            "식품명": "조미김",
            "칼로리": [
                25,
                "kcal"
            ],
            "creation_date": 1638775407.508602
        },
        {
            "지방": [
                10.74,
                "g"
            ],
            "단백질": [
                14.48,
                "g"
            ],
            "owner": null,
            "partition": "food2",
            "탄수화물": [
                83.47,
                "g"
            ],
            "id": "QbwxDEaCdfTYTwwViAvCVW",
            "식품명": "돈코츠라멘",
            "칼로리": [
                499,
                "kcal"
            ],
            "creation_date": 1638775417.7893379
        }
    ],
    "stdout": "",
    "duration": 0.6990203857421875
}
```

### 4. 음식 여러개의 총 영양정보 반환
#### input
```
{"cmd":"food.foods_nutriiton", "query":["조미김", "돈코츠라멘", "배추김치"]}
```
#### output
```
{
    "response": {
        "탄수화물": 86.6,
        "단백질": 15.82,
        "지방": 12.77,
        "칼로리": 532
    },
    "stdout": "",
    "duration": 0.710848331451416
}
```

### 5. 주어진 음식 목록과 목표 영양상태에 대하여 음식 추천 랭킹 반환
#### input
> dris : 이번 식사로 얻기 원하는 목표 영양소 양
> food_set : 추천 목록 음식 set
> > e.g.
> > 
> > main_dish = ["김치찌개", "피자", "양념치킨", "조기구이", "라면", "김치볶음밥", "카레덮밥", "육개장", "된장찌개", "잔치국수", "닭볶음탕", "삼계탕", "불고기", "떡국", "칼국수"]
> > 
> > side_dish = ["오곡밥", "배추김치", "멸치볶음", "오징어튀김", "돼지고기장조림", "닭강정", "두부", "마늘쫑무침", "미역국", "콩나물무침", "현미밥"]
```
{"cmd":"reco.make_reco_ranks", "query":{"dris":{"탄수화물":40, "단백질":25, "지방":15, "칼로리":900},"food_set":["오곡밥", "배추김치", "멸치볶음", "오징어튀김", "돼지고기장조림", "닭강정", "두부", "마늘쫑무침", "미역국", "콩나물무침", "현미밥"]}}
```
#### output
```
{
    "response": [
        [
            0.58948,
            {
                "지방": [
                    6.78,
                    "g"
                ],
                "단백질": [
                    15.06,
                    "g"
                ],
                "owner": null,
                "partition": "food2",
                "탄수화물": [
                    16.08,
                    "g"
                ],
                "id": "n9kGpAWMuVRaCZyp65PvZo",
                "식품명": "미역국",
                "칼로리": [
                    177,
                    "kcal"
                ],
                "creation_date": 1638773231.154814
            }
        ],
        [
            0.6085499999999999,
            {
                "지방": [
                    9.74,
                    "g"
                ],
                "단백질": [
                    15.9,
                    "g"
                ],
                "owner": null,
                "partition": "food2",
                "탄수화물": [
                    3.09,
                    "g"
                ],
                "id": "cB7YoGTkQqEwqKBia9ifgJ",
                "식품명": "돼지고기장조림",
                "칼로리": [
                    166,
                    "kcal"
                ],
                "creation_date": 1638773225.2465281
            }
        ],
        [
            0.6816533333333332,
            {
                "지방": [
                    46.51,
                    "g"
                ],
                "단백질": [
                    34.51,
                    "g"
                ],
                "owner": null,
                "partition": "food2",
                "탄수화물": [
                    26.32,
                    "g"
                ],
                "id": "eFZcqs44Ga7SN5WMUyWJ73",
                "식품명": "닭강정",
                "칼로리": [
                    663,
                    "kcal"
                ],
                "creation_date": 1638773226.3496954
            }
        ],
        [
            0.74175,
            {
                "지방": [
                    1.53,
                    "g"
                ],
                "단백질": [
                    6.3,
                    "g"
                ],
                "owner": null,
                "partition": "food2",
                "탄수화물": [
                    68.95,
                    "g"
                ],
                "id": "4NV3PYWgTeTFbZUJ3TAXZo",
                "식품명": "현미밥",
                "칼로리": [
                    321,
                    "kcal"
                ],
                "creation_date": 1638773234.3216667
            }
        ],
        [
            0.74894,
            {
                "지방": [
                    0.88,
                    "g"
                ],
                "단백질": [
                    6.23,
                    "g"
                ],
                "owner": null,
                "partition": "food2",
                "탄수화물": [
                    67.62,
                    "g"
                ],
                "id": "Y7jLf9Ya2MRN2tRoWD2JLe",
                "식품명": "오곡밥",
                "칼로리": [
                    308,
                    "kcal"
                ],
                "creation_date": 1638773218.3746808
            }
        ],
        [
            0.7578766666666668,
            {
                "지방": [
                    5.26,
                    "g"
                ],
                "단백질": [
                    10.12,
                    "g"
                ],
                "owner": null,
                "partition": "food2",
                "탄수화물": [
                    3.51,
                    "g"
                ],
                "id": "HFMmYkR3sRFGifbTrc4m2v",
                "식품명": "두부",
                "칼로리": [
                    99,
                    "kcal"
                ],
                "creation_date": 1638773227.4554205
            }
        ],
        [
            0.8315566666666665,
            {
                "지방": [
                    4.09,
                    "g"
                ],
                "단백질": [
                    7.43,
                    "g"
                ],
                "owner": null,
                "partition": "food2",
                "탄수화물": [
                    0.35,
                    "g"
                ],
                "id": "Nb5BxFZFFMrSryfcZgpPVc",
                "식품명": "멸치볶음",
                "칼로리": [
                    69,
                    "kcal"
                ],
                "creation_date": 1638773221.5242622
            }
        ],
        [
            0.8466,
            {
                "지방": [
                    2.12,
                    "g"
                ],
                "단백질": [
                    5.8,
                    "g"
                ],
                "owner": null,
                "partition": "food2",
                "탄수화물": [
                    6.44,
                    "g"
                ],
                "id": "Hd6jB2PQoGCcLqiBwjQ6Ym",
                "식품명": "오징어튀김",
                "칼로리": [
                    70,
                    "kcal"
                ],
                "creation_date": 1638773223.1502817
            }
        ],
        [
            0.8721266666666666,
            {
                "지방": [
                    2.45,
                    "g"
                ],
                "단백질": [
                    2.07,
                    "g"
                ],
                "owner": null,
                "partition": "food2",
                "탄수화물": [
                    9.94,
                    "g"
                ],
                "id": "SrTs7Upu2NG6QWzQAYqjxy",
                "식품명": "마늘쫑무침",
                "칼로리": [
                    62,
                    "kcal"
                ],
                "creation_date": 1638773229.052202
            }
        ],
        [
            0.9145966666666667,
            {
                "지방": [
                    1.13,
                    "g"
                ],
                "단백질": [
                    2.31,
                    "g"
                ],
                "owner": null,
                "partition": "food2",
                "탄수화물": [
                    5.99,
                    "g"
                ],
                "id": "ZBTUumwV8KoLB2fkwKX57J",
                "식품명": "콩나물무침",
                "칼로리": [
                    38,
                    "kcal"
                ],
                "creation_date": 1638773232.269016
            }
        ]
    ],
    "stdout": "",
    "duration": 2.0454256534576416
}
```