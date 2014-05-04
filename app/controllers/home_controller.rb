class HomeController < ApplicationController
  def index
  end

  def search
    render :json => Autoiq.inventory_by_zipcode( params )
  end
end
