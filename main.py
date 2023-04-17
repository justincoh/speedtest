import psycopg2

# conn = psycopg2.connect("dbname=user=")

# test_insert = "2023-04-16T20:32:43.000Z,Sunday,16:32:43,527.81,23.72,4.76,Comcast Cable,speedtest.is.cc,Secaucus NJ,https://www.speedtest.net/result/c/19057bee-7d7c-41e9-86c1-fb106f3f4dbd"
as_an_array = [
    '2023-04-16T20:32:43.000Z',
    'Sunday',
    '16:32:43',
    '527.81',
    '23.72',
    '4.76',
    'Comcast Cable',
    'speedtest.is.cc',
    'Secaucus NJ',
    'https://www.speedtest.net/result/c/19057bee-7d7c-41e9-86c1-fb106f3f4dbd'
]
# print(conn)
cur = conn.cursor()
cur.executemany(
    "INSERT INTO results VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
    [as_an_array, as_an_array]
)
conn.commit()
conn.close()
