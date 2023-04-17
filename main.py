import csv
import psycopg2
from dotenv import dotenv_values

ENV_VARS = dotenv_values(".env")

# def read_results():
#     with open("results.csv", "r") as infile:
#         csv_reader = csv.DictReader(infile)
#         return [row.values() for row in csv_reader]

def read_results():
    with open("results.csv", "r") as infile:
        reader = csv.reader(infile)

        # Skip the header row
        next(reader)

        # This has to be tuple because psycopg2 doesn't like lists
        return [tuple(row) for row in reader]


def write_results(results):
    conn = psycopg2.connect(f"dbname={ENV_VARS['DB_NAME']} user={ENV_VARS['DB_USER']}")
    cur = conn.cursor()
    cur.executemany(
        "INSERT INTO results ( \
            timestamp, \
            day_of_week,time, \
            download_mbps, \
            upload_mbps, \
            packet_loss, \
            isp, \
            server_host, \
            server_location, \
            share_url \
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
        (results)
    )
    conn.commit()
    conn.close()

def main():
    results = read_results()
    import ipdb;ipdb.set_trace()
    try:
        write_results(results)
    except Exception as e:
        import ipdb; ipdb.set_trace()
        print("damn")

main()