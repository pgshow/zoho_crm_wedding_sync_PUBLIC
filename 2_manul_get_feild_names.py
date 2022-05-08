import requests
from loguru import logger
from zoho import API


def get_fields_name():
    api_csl = API('account2')

    access_token = api_csl.get_access_token()

    url = 'https://www.zohoapis.eu/crm/v2/settings/fields?module=Leads'

    headers = {
        'Authorization': f'Zoho-oauthtoken {access_token}',
    }

    r = requests.get(url=url, headers=headers)
    print(r.text)


get_fields_name()
