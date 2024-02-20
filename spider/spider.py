import requests
import requests.cookies
import json
from datetime import datetime

def spider_get():
    pn = 1
    ps = 15
    vmid = 44629592
    url = f'https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn={pn}&ps={ps}&vmid={vmid}&ts={int(datetime.utcnow().timestamp())}'
    cookies_str = "buvid3=6EA4450F-DB27-F425-0555-04B113C3997F43064infoc; b_nut=1693853743; i-wanna-go-back=-1; b_ut=7; _uuid=D2E43373-1251-F1019-8C10E-81E76B91D3B445044infoc; buvid4=73613F18-E30C-6406-AB06-75F60D2C0E7C43833-023090502-BUUSsO1YOMM%2BiPrlWIRg3Q%3D%3D; DedeUserID=44629592; DedeUserID__ckMd5=3db3e6308bfe2d5b; rpdid=|(Y|Yl|~~kR0J'uYmJm|kkk~; CURRENT_BLACKGAP=0; LIVE_BUVID=AUTO9216944342334536; hit-dyn-v2=1; buvid_fp_plain=undefined; enable_web_push=DISABLE; header_theme_version=CLOSE; CURRENT_FNVAL=4048; fingerprint=64b57ac3640f81c3eaea3df73ebd0e4e; buvid_fp=64b57ac3640f81c3eaea3df73ebd0e4e; CURRENT_QUALITY=116; SESSDATA=84f18761%2C1723833320%2C7e834%2A22CjBZ2LoOvdPDWzcRt_Xo-Ld97Hcrc10pPMPGsNYmZxHFhqySJ5XIfvFWoYPZtQT4Zd0SVkxnTEFmM0M1LVVaV0xhYjYyNW1XQjZsZ24tUmVmMUptVzg5UlM3MDV5UlZkZDZ2Si15eXZYUFhXNmRLSUROdlNDRDRUcnh1cDVVTy1YUkktUW9JOFBBIIEC; bili_jct=73e2920a1c76d92c0a00a68af6a5ee95; sid=61qc0abc; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDg1NDA1MzMsImlhdCI6MTcwODI4MTI3MywicGx0IjotMX0.lA-lOUV2ivy534IYCUQMJcDlUDzOYE4QQ4Dq05RvF2E; bili_ticket_expires=1708540473; PVID=1; home_feed_column=4; browser_resolution=958-560; bp_video_offset_44629592=900259234429534210; b_lsid=4C63ED56_18DC76785AB"
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
        response = requests.get(url=url, cookies=jar, headers=headers)

        data = json.loads(response.text)['data']
        
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