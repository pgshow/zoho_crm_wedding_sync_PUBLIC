import time
from loguru import logger
from scrape import Scrape
from pyvirtualdisplay import Display

if __name__ == '__main__':

    while 1:
        try:
            s1 = Scrape('geral@casadosarcosbo', 'Casa dos Arcos', '20078204804')  # owner - Ines Sottomayor
            s1.start()
        except Exception as e:
            logger.critical(e)

        try:
            s2 = Scrape('quintadaeira', 'Quinta da Eira', '20080117362')  # owner - Marina Fonseca
            s2.start()
        except Exception as e:
            logger.critical(e)

        try:
            s3 = Scrape('quinta de segade', 'Quinta de Segade', '20080117362')  # owner - Marina Fonseca
            s3.start()
        except Exception as e:
            logger.critical(e)

        logger.debug('Sleep for 10 minutes')
        time.sleep(600)
