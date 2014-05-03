module Autoiq  
  class << self
    
    def access_token
      Rails.cache.fetch([self, "access_token"]) { get_access_token_from_edmunds }
    end
    
    private
    def get_access_token_from_edmunds
      request = Typhoeus::Request.new(
        EDMUNDS_ENDPOINT + '/inventory/token',
        method: :post,
        body: { "client_id" => EDMUNDS_CLIENT_KEY, "client_secret" => EDMUNDS_CLIENT_SECRET, "grant_type" => "client_credentials" },
        headers: { "Content-Type" => "application/x-www-form-urlencoded" }
      )
      JSON.parse(request.run.body)['access_token']
    end
    
  end
end
