import json
import subprocess

res = subprocess.run("speedtest --format=json", shell=True, capture_output=True)
output_json = json.loads(res.stdout)

"""
CompletedProcess(args='speedtest --format=json', returncode=0, stdout=b'{"type":"result","timestamp":"2023-04-09T17:52:04Z","ping":{"jitter":2.462,"latency":8.050,"low":5.557,"high":11.447},"download":{"bandwidth":23594617,"bytes":248400056,"elapsed":11009,"latency":{"iqm":18.997,"low":9.370,"high":224.945,"jitter":7.982}},"upload":{"bandwidth":22171674,"bytes":234002683,"elapsed":11124,"latency":{"iqm":16.331,"low":6.358,"high":376.804,"jitter":16.504}},"packetLoss":0,"isp":"Verizon Fios","interface":{"internalIp":"192.168.1.18","name":"en0","macAddr":"C4:35:D9:82:B3:8A","isVpn":false,"externalIp":"108.50.243.193"},"server":{"id":49834,"host":"speedtest1.nyc1.nitelusa.net","port":8080,"name":"Nitel","location":"New York, NY","country":"United States","ip":"96.8.96.254"},"result":{"id":"8a3e243d-8906-43f0-9214-bd15c0e85d43","url":"https://www.speedtest.net/result/c/8a3e243d-8906-43f0-9214-bd15c0e85d43","persisted":true}}\n', stderr=b'')
"""