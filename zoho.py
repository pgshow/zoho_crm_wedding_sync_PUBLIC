import time

import requests
import json
import config
from loguru import logger
from retry import retry


@retry(tries=10, delay=5, backoff=2, max_delay=60)
def fetch(url, time_out, method='get', headers=None, data=None):
    if not isinstance(headers, dict):
        headers = dict()

    r = None
    try:
        if data or method == 'post':
            r = requests.post(url, headers=headers, timeout=time_out, data=data)
        else:
            r = requests.get(url, headers=headers, timeout=time_out)

    except Exception as e:
        logger.error(e)
    finally:
        r and r.close()

    return r


class API:
    def __init__(self, account):
        self.account = account

    def get_access_token(self):
        """get access_token by fresh_token"""
        a = config.accounts[self.account]
        url = f"https://accounts.zoho.eu/oauth/v2/token?refresh_token={a['refresh_token']}&client_id={a['client_id']}&client_secret={a['client_secret']}&grant_type=refresh_token"
        while 1:
            r = fetch(url=url, time_out=30, method='post')
            if 'access_token' not in r.text:
                logger.error(f"Get access_token failed, status: {r.status_code}")
                time.sleep(15)
                logger.debug(f"Get access_token retry")
                continue

            return r.json()['access_token']

    def insert_records(self, record_list):
        access_token = self.get_access_token()
        if not access_token:
            return

        url = 'https://www.zohoapis.eu/crm/v2/Leads'

        headers = {
            'Authorization': f'Zoho-oauthtoken {access_token}',
        }

        request_body = dict()

        request_body['data'] = record_list

        trigger = [
            'approval',
            'workflow',
            'blueprint'
        ]

        request_body['trigger'] = trigger

        r = fetch(url=url, time_out=30, headers=headers, data=json.dumps(request_body).encode('utf-8'))
        if r.status_code != 202 and r.status_code != 201:
            raise Exception(f'{record_list[0]["Email"]} submit failed, status: {r.status_code}')

        if r is not None:
            json_data = r.json()
            if json_data['data'][0]['status'] != 'success':
                if json_data["data"][0]["message"] == 'duplicate data':
                    # Duplicate data
                    logger.warning(f'{record_list[0]["Email"]} Submit: {json_data["data"][0]["message"]}')
                    return True
                else:
                    # Unknown error
                    raise Exception(f'{record_list[0]["Email"]} Submit: {json_data["data"][0]}')

            # Succeed
            logger.success(f'{record_list[0]["Email"]} Submit to CRM succeed')
            time.sleep(1)
            # print(json.dumps(r.json(), sort_keys=True, indent=4, separators=(',', ':')))
            return True


if __name__ == '__main__':
    zolo_cls = API('account1')

    record_list = list()

    record_object_1 = {
        'Company': 'Zylker',
        'Email': 'p.daly@zylker.com',
        'Last_Name': 'Daly',
        'First_Name': 'Paul',
        'Lead_Status': 'Contacted',
    }

    record_object_2 = {
        'Last_Name': 'Dolan',
        'First_Name': 'Brian',
        'Email': 'brian@villa.com',
        'Company': 'Villa Margarita'
    }

    record_list.append(record_object_1)
    record_list.append(record_object_2)

    zolo_cls.insert_records(record_list)