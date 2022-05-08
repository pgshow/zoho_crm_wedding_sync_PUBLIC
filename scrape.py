import re
import time

from zoho import API
from loguru import logger
from date_extractor import extract_dates
from safe_driver import SafeDriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By


class Scrape:
    def __init__(self, casamentos_account, area, owner):
        self.casamentos_account = casamentos_account
        self.area = area
        self.leads_owner = owner
        self.zoho_cls = API('account2')

    def start(self):
        logger.debug(f'-- Start check {self.casamentos_account}')

        with SafeDriver(self.casamentos_account) as chrome:
            driver = chrome.driver

            self.goto_uncheck_page(driver)

            failed_times = 0
            for i in range(100):
                time.sleep(10)
                if failed_times > 10:
                    raise Exception("Continuous failures more than 10 times, please check")

                try:
                    # go back to list page
                    self.goto_uncheck_page(driver)

                    if not self.need_sync(driver):
                        logger.warning('No more Pendentes record')
                        break

                    # open a message
                    time.sleep(1)
                    try:
                        msg_url = driver.find_element(By.CSS_SELECTOR, "ul.inbox-messages-board > div a.inboxMessage__name").get_attribute('href')
                        driver.get(msg_url)
                    except:
                        raise Exception("Open message failed")

                    self.extract_record(driver)

                    # Change the status of the record
                    self.change_status(driver)

                    failed_times = 0

                except Exception as e:
                    failed_times += 1
                    logger.error(f'Sync err: {e}')

        logger.debug(f'-- End check {self.casamentos_account}')

    @staticmethod
    def need_sync(driver):
        """Pending message above 0"""
        pending_tmp = driver.find_element(By.CSS_SELECTOR, 'h1')
        if pending_tmp:
            if re.search(r'Os meus pedidos \(\d', pending_tmp.text):
                return True

    def extract_record(self, driver):
        """Extract data from record page"""
        WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.XPATH, "//span[contains(text(), 'Recebida a')]")))  # until page load

        time.sleep(1)

        record = dict()

        # Extract info
        record['full_name'] = driver.find_element(By.CSS_SELECTOR, 'p.tools-title.tools-inbox-title').text

        phone_tmp = driver.find_element(By.CSS_SELECTOR, '.icon-form-mobile + .inbox-vendor-profile__mail').text
        regex = re.compile(r"\D")
        record['phone'] = regex.sub('', phone_tmp)

        record['email'] = driver.find_element(By.CSS_SELECTOR, '.icon-form-mail + .inbox-vendor-profile__mail').text

        try:
            num_tmp = driver.find_element(By.XPATH, "//span[contains(@class, 'icon-form-group')]/..").text
            num_tmp = num_tmp.replace('Convidados: ', '')
            num_slice = re.split(r'\D', num_tmp)  # Get the number if it's a range
            record['num'] = num_slice[-1]
        except:
            record['num'] = '0'

        record['description'] = driver.find_element(By.CSS_SELECTOR, 'p.adminConversation__comment').text

        local_tmp = driver.find_element(By.CSS_SELECTOR, '.inbox-vendor-profile__content > div.text-center').text
        local = re.search(r'Está à procura: (.+?)$', local_tmp).group(1)
        record['event_local'] = local

        date_tmp = driver.find_element(By.XPATH, "//div[@class='inbox-vendor-profileList__item' and contains(string(.), 'Evento:')]").text
        date_tmp = extract_dates(date_tmp.replace('Evento: ', ''))
        if date_tmp[0]:
            record['event_date'] = date_tmp[0].strftime('%Y-%m-%d')
        else:
            record['event_date'] = None

        self.submit_record(record)

    def change_status(self, driver):
        """Change the status of the record"""
        logger.debug('Change message status')
        select_element1 = driver.find_element(By.CSS_SELECTOR, 'span.app-va-status-selected')
        select_element1.click()
        time.sleep(1)
        select_element2 = driver.find_element(By.CSS_SELECTOR, 'span.app-change-status-leads')
        select_element2.click()
        time.sleep(1)

        WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".app-va-status-selected > i.adminBullet--blue")))  # until changed status

    def goto_uncheck_page(self, driver):
        """Goto to Pendentes list page"""
        logger.debug('Go back to list page')
        driver.get('https://www.casamentos.pt/emp-AdminSolicitudes.php?gf=0')

        # Wait inbox list
        try:
            WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.XPATH, "//h1")))
            if 'Os meus pedidos' not in driver.find_element(By.XPATH, '//h1').text:
                raise
            return True
        except Exception as e:
            if 'Esqueceu-se da sua password?' in driver.page_source:
                raise Exception(f'{self.casamentos_account} cookie expired')
            else:
                raise Exception(f'Open inbox page failed, {e}')

    def submit_record(self, record):
        """Submit record"""
        record_list = list()

        logger.debug('Submit record')

        # Get first name and last name
        name_list = record['full_name'].replace('Online', '').strip().split(' ')
        if len(name_list) == 1:
            first_name = ''
            last_name = record['full_name']
        elif len(name_list) == 2:
            first_name = name_list[0]
            last_name = name_list[1]
        else:
            first_name = name_list[0]
            last_name = name_list[-1]

        record_object = {
            'First_Name': first_name,
            'Last_Name': last_name,
            'Natureza_do_Evento': 'Familiar',
            'Tipo_de_Evento': 'Casamentos',
            'Local': self.area,
            'Lead_Source': 'casamentos.pt',
            'Email': record['email'],
            'Mobile': record['phone'],
            'Description': record['description'],
            'Local_do_Evento': record['event_local'],
            'Data_do_evento': record['event_date'],
            'Convidados': record['num'],
            'Owner': self.leads_owner,
        }
        record_list.append(record_object)

        self.zoho_cls.insert_records(record_list)


if __name__ == '__main__':
    s = Scrape('geral@casadosarcosbo', 'Casa dos Arcos')
    s.start()
