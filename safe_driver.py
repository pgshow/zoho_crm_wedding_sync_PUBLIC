import os
import signal
import time

import psutil
import config
from pathlib import Path
from selenium import webdriver
from selenium_stealth.selenium_stealth import stealth


class SafeDriver:
    def __init__(self, account):
        self.options = webdriver.ChromeOptions()

        self.init_base_cap()

        chrome_profile_path = Path(os.path.abspath(os.getcwd()), 'snap', 'chromeCache', account)

        # chrome_profile_path = f"{os.path.abspath(os.getcwd())}\\snap\\chromeCache\\{account}"
        self.options.add_argument(f'--user-data-dir={chrome_profile_path}')

        self.driver = self.init_chrome()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.driver:
            # get the PIDs
            self.driver.service.process
            p = psutil.Process(self.driver.service.process.pid)
            children = p.children(recursive=True)

            # quite selenium
            self.driver.quit()

            # kill the chrome PIDs
            for child in children:
                try:
                    # kill child pid
                    os.kill(child.pid, signal.SIGKILL)
                except:
                    pass
            try:
                # kill main pid
                os.kill(p.pid, signal.SIGKILL)
            except:
                pass
            time.sleep(1)

    def init_chrome(self):
        self.set_cap()

        driver = webdriver.Chrome(executable_path=config.chrome_path, options=self.options)
        self.add_stealth_js(driver)
        return driver

    def init_base_cap(self):
        self.options.add_argument("--headless")
        self.options.add_argument("--window-size=1920,1080")
        self.options.add_argument("--no-sandbox")
        self.options.add_argument("--disable-gpu")
        self.options.add_argument("--disable-impl-side-painting")
        # self.options.add_argument("--disable-gpu-sandbox")
        self.options.add_argument("--disable-accelerated-2d-canvas")
        self.options.add_argument("--disable-accelerated-jpeg-decoding")
        self.options.add_argument("--test-type=ui")
        self.options.add_argument("--ignore-certificate-errors")
        self.options.add_experimental_option('excludeSwitches', ['enable-logging'])
        # self.options.add_experimental_option("detach", True)

    def set_cap(self):
        # self.options.add_argument("--headless")

        prefs = {
            'profile.default_content_settings.popups': 0,
            'profile.default_content_setting_values': {
                'images': 2,  # 不加载图片
                'permissions.default.stylesheet': 2,  # 不加载css
            }
        }

        self.options.add_experimental_option("prefs", prefs)

    @staticmethod
    def add_stealth_js(driver):
        """
        hide selenium
        """
        stealth(driver,
                languages=["en"],
                vendor="Google Inc.",
                platform="Win32",
                webgl_vendor="Google Inc. (NVIDIA)",
                renderer="ANGLE (NVIDIA, NVIDIA GeForce RTX 3080 Direct3D11 vs_5_0 ps_5_0, D3D11-27.21.14.7005)",
                fix_hairline=True,
                )


if __name__ == '__main__':
    D = SafeDriver()