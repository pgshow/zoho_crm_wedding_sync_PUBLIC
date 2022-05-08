import requests
from loguru import logger


def get_refresh_token():
    url = 'https://accounts.zoho.eu/oauth/v2/token'  # remember change the accounts.zoho.eu part to your account area
    data = {
        'grant_type': 'authorization_code',
        'client_id': '1000.A3LXGCLJFZSL1L4K8F2C5E66MM7Q7H',
        'client_secret': '6cd1e6c27da0a63f931835d9af030e2f8608bf9cf0',
        'redirect_uri': '',
        'code': '1000.9360b1abf9555a8debe0b377d558978f.99b0f43c6ac91f95dea501dc14dce0ea',
        # This code is from api-console.zoho.eu, in an App when your create a scope, you need point a scope value when you create it, watch README.md
    }
    response = requests.post(url=url, data=data)
    print(response.status_code)
    print(response.json())
    logger.success('Please copy and set refresh_token for your API')


get_refresh_token()
