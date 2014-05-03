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
      opts.each{ |k,v| body += "#{k}=#{v}&" }      
      request = Typhoeus::Request.new(
        EDMUNDS_ENDPOINT + '/api/inventory/v1/getall?' + body + "basicFilter=make:%22#{opts[:make]}%22",
        method: :get,
        headers: { "Authorization" => "Bearer " + self.access_token }
      )
      response = request.run
      
      # If request fails, generate new token and re-execute.
      if response.success?
        result = JSON.parse(response.body, :symbolize_names => true)
        photos = get_all_photos(result)
        result[:photos] = photos
        return result
      else
        self.access_token(renew=true)
        return inventory_by_zipcode(opts)
      end
    end
    
    # Returns Edmunds URL for a given inventory.
    def inventory_link(inventory, opts={})
      raise ArgumentError, 'zipcode missing' if opts[:zipcode].blank?
      opts[:radius] = 100 if opts[:radius].blank?
      
      "http://www.edmunds.com/inventory/vin.html?" + 
      "make=#{inventory[:make]}&" + 
      "inventoryId=#{inventory[:inventoryId]}&" + 
      "zip=#{opts[:zipcode]}&" + 
      "radius=#{opts[:radius]}"
    end
    
    def get_all_photos(inventory)
      style_ids = inventory[:resultsList].select{ |i| i[:styleId] != "N/A" }.map{ |s| s[:styleId] }.uniq
      all_photos = {}
      style_ids.each do |s|
        sources = find_photos_by_shot_type(s)[0][:photoSrcs]
        sizes = {}
        sources.each{ |source| sizes[source.split("_")[-1].split('.')[0].to_i] = source }
        largest_size = sizes.keys.max
        photo = EDMUNDS_MEDIA_ENDPOINT + sizes[largest_size]
        all_photos[s] = photo
      end
      all_photos
    end
    
    # For shot_types:
    # http://developer.edmunds.com/api-documentation/vehicle/media_photos/v1/
    def find_photos_by_shot_type(style_id, shot_type = "FQ")
      find_photos(style_id).select{|p| p[:shotTypeAbbreviation] == shot_type}
    end
    
    # Returns media photos of a given style_id.
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
