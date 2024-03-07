import requests
import requests.cookies
import json
from datetime import datetime


def read_cookies_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        cookies_text = f.read()
        return cookies_text

def spider_get():
    pn = 1
    ps = 15
    vmid = 44629592
    url = f'https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn={pn}&ps={ps}&vmid={vmid}&ts={int(datetime.utcnow().timestamp())}'
    cookies_file_path = "./spider/cookies.txt"
    cookies_str = read_cookies_file(cookies_file_path)
    jar = requests.cookies.RequestsCookieJar()
    for cookie in cookies_str.split('; '):
        key, value = cookie.split('=', 1)
        jar.set(key, value)

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Content-Type": "application/json"
    }

    total = 0
    counter = 0

    data_list = list()

    while counter <= total:
        try:
            response = requests.get(url=url, cookies=jar, headers=headers)
            data = json.loads(response.text)['data']
        except:
            return []
        # 第一次
        if total == 0:
            total = data['total']

        counter += len(data['list'])
        
        for item in data['list']:
            data_list.append(item)

        if counter == total:
            break
        
        pn += 1
        url = f'https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn={pn}&ps={ps}&vmid={vmid}&ts={int(datetime.utcnow().timestamp())}'

    return data_list


if __name__ == "__main__":
    data = spider_get()
    
    index = 1
    for item in data:
        print(f"|{index}\n|标题:{item['title']}\n|子标题:{item['subtitle']}\n|简介:{''.join(item['evaluate'].split())}\n|发布时间:{item['publish']['release_date_show']}\n|上架时间:{item['publish']['pub_time_show']}\n")
        index += 1