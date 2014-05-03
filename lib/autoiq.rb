module Autoiq  
  class << self
    
    def access_token(renew=false)
      Rails.cache.delete([self, "access_token"]) if renew
      Rails.cache.fetch([self, "access_token"], :expires_in => 1.hour) { get_access_token_from_edmunds }
    end
    
    def inventory_by_zipcode(opts={})
      raise ArgumentError, 'zipcode missing' if opts[:zipcode].blank?
      raise ArgumentError, 'make missing' if opts[:make].blank?
      
      opts[:radius] = 100 if opts[:radius].blank?
      
      body = ""
      opts.each{ |k,v| body += "#{k}=#{v}&"}      
      request = Typhoeus::Request.new(
        EDMUNDS_ENDPOINT + '/api/inventory/v1/getall?' + body + "basicFilter=make:%22#{opts[:make]}%22",
        method: :get,
        headers: { "Authorization" => "Bearer " + self.access_token }
      )
      response = request.run
      
      if response.success?
        return JSON.parse(response.body, :symbolize_names => true)
      else
        self.access_token(renew=true)
        return inventory_by_zipcode(opts)
      end
    end
    
    def inventory_link(inventory, opts={})
      "http://www.edmunds.com/inventory/vin.html?" + 
      "make=#{inventory[:make]}&" + 
      "inventoryId=#{inventory[:inventoryId]}&" + 
      "zip=#{opts[:zipcode]}&" + 
      "radius=#{opts[:radius]}"
    end
    
    def find_photos(style_id)
      response = Typhoeus::Request.new(
        EDMUNDS_ENDPOINT + '/v1/api/vehiclephoto/service/findphotosbystyleid?styleId=' + style_id + '&api_key=' + EDMUNDS_CLIENT_KEY,
        method: :get,
      ).run
      JSON.parse(response.body, :symbolize_names => true)
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
