EDMUNDS_CONFIG = YAML.load_file("#{::Rails.root}/config/edmunds.yml")[::Rails.env]
EDMUNDS_CLIENT_KEY = EDMUNDS_CONFIG['client_key']
EDMUNDS_CLIENT_SECRET = EDMUNDS_CONFIG['client_secret']
EDMUNDS_ENDPOINT = EDMUNDS_CONFIG['endpoint']