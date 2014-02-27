require_relative 'rails_lite/controller_base'
require_relative 'rails_lite/router'
require_relative 'rails_lite/session'
require_relative 'rails_lite/params'

class Flash
  def initialize
    @flash = { }
  end

  def [](key)
    @flash[key]
  end

  def []=(key, val)
    @flash[key] = val
  end
  
  def

end