from webdriver_manager.chrome import ChromeDriverManager

chrome_path = ChromeDriverManager().install()

accounts = {
    'account1': {
        'client_id': '1000.AF1NV035MQO8POURWQ2KG138BFW5PV',
        'client_secret': 'b943ef50546e2c9351e373dd33c28c35695ee6358c',
        'refresh_token': '1000.7326f3b8afae12c1b554c829f370aa7d.809e5e0c5a3c81e058201dd8ac6104de',
    },
    'account2': {
        'client_id': '1000.A3LXGCLJFZSL1L4K8F2C5E66MM7Q7H',
        'client_secret': '5bd1e6c27da0a63f931835d9af030e2f8698bf9cf0',
        'refresh_token': '1000.cf72a865b223315296386201a3f7857f.ac93c752258ada9409892b757c535601',
    }
}