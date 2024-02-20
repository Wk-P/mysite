c1 = "buvid3=6EA4450F-DB27-F425-0555-04B113C3997F43064infoc; b_nut=1693853743; i-wanna-go-back=-1; b_ut=7; _uuid=D2E43373-1251-F1019-8C10E-81E76B91D3B445044infoc; buvid4=73613F18-E30C-6406-AB06-75F60D2C0E7C43833-023090502-BUUSsO1YOMM%2BiPrlWIRg3Q%3D%3D; DedeUserID=44629592; DedeUserID__ckMd5=3db3e6308bfe2d5b; rpdid=|(Y|Yl|~~kR0J'uYmJm|kkk~; CURRENT_BLACKGAP=0; LIVE_BUVID=AUTO9216944342334536; hit-dyn-v2=1; buvid_fp_plain=undefined; enable_web_push=DISABLE; header_theme_version=CLOSE; CURRENT_FNVAL=4048; fingerprint=64b57ac3640f81c3eaea3df73ebd0e4e; buvid_fp=64b57ac3640f81c3eaea3df73ebd0e4e; CURRENT_QUALITY=116; SESSDATA=84f18761%2C1723833320%2C7e834%2A22CjBZ2LoOvdPDWzcRt_Xo-Ld97Hcrc10pPMPGsNYmZxHFhqySJ5XIfvFWoYPZtQT4Zd0SVkxnTEFmM0M1LVVaV0xhYjYyNW1XQjZsZ24tUmVmMUptVzg5UlM3MDV5UlZkZDZ2Si15eXZYUFhXNmRLSUROdlNDRDRUcnh1cDVVTy1YUkktUW9JOFBBIIEC; bili_jct=73e2920a1c76d92c0a00a68af6a5ee95; sid=61qc0abc; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDg1NDA1MzMsImlhdCI6MTcwODI4MTI3MywicGx0IjotMX0.lA-lOUV2ivy534IYCUQMJcDlUDzOYE4QQ4Dq05RvF2E; bili_ticket_expires=1708540473; PVID=1; b_lsid=7510292A2_18DC7150BA8; home_feed_column=4; browser_resolution=958-560; bp_video_offset_44629592=900259234429534210"
c2 = "buvid3=6EA4450F-DB27-F425-0555-04B113C3997F43064infoc; b_nut=1693853743; i-wanna-go-back=-1; b_ut=7; _uuid=D2E43373-1251-F1019-8C10E-81E76B91D3B445044infoc; buvid4=73613F18-E30C-6406-AB06-75F60D2C0E7C43833-023090502-BUUSsO1YOMM%2BiPrlWIRg3Q%3D%3D; DedeUserID=44629592; DedeUserID__ckMd5=3db3e6308bfe2d5b; rpdid=|(Y|Yl|~~kR0J'uYmJm|kkk~; CURRENT_BLACKGAP=0; LIVE_BUVID=AUTO9216944342334536; hit-dyn-v2=1; buvid_fp_plain=undefined; enable_web_push=DISABLE; header_theme_version=CLOSE; home_feed_column=5; browser_resolution=1920-911; CURRENT_FNVAL=4048; fingerprint=64b57ac3640f81c3eaea3df73ebd0e4e; buvid_fp=64b57ac3640f81c3eaea3df73ebd0e4e; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDgyNTQ2MTMsImlhdCI6MTcwNzk5NTM1MywicGx0IjotMX0.To03Q4VbfFIqBZltCx61dWAtNa0pRVQDFyvZJCBYsX8; bili_ticket_expires=1708254553; SESSDATA=c4715a51%2C1723550651%2Ce7817%2A22CjAo9-L5GbkQc9tUfe5aUw6N8Ox1jvsoYrDTbUsx4FF1gcRm6ehZNxMKUQZm3tOTbEoSVnZTTE5zNlplb3BlUXpZUThKblBvWC1pSjl2RVlMQWJtcWxYWWFhVGhvTWc5MnE0bXdkcjZGVDdCei0zUDc2SFdzQzBycFZaSS1QS3dHS0VJY2tzSnlRIIEC; bili_jct=a795ccf41a51eaea32fbc43ed121aa12; CURRENT_QUALITY=116; PVID=5; sid=7m48b1hu; b_lsid=F37EAEBF_18DB26F5D1F; bp_video_offset_44629592=898751357317546007"


import requests.cookies

jar1 = requests.cookies.RequestsCookieJar()
for cookie in c1.split('; '):
    key, value = cookie.split('=', 1)
    jar1.set(key, value)

jar2 = requests.cookies.RequestsCookieJar()
for cookie in c2.split('; '):
    key, value = cookie.split('=', 1)
    jar2.set(key, value)

jd1 = {key:value for key, value in jar1.items()}
jd2 = {key:value for key, value in jar2.items()}

for k in jd1:
    print(f"{k}: {jd1[k]}")

print("----")

for k in jd2:
    print(f"{k}: {jd2[k]}")

diff_keys = set(jd1.keys()).symmetric_difference(jd2.keys())
diff_values = {key: (jd1.get(key), jd2.get(key)) for key in diff_keys if key in jd1 or key in jd2}

print("不同的键值对：", diff_values)

print(jd1 == jd2)