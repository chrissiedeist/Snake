require 'uri'
require 'debugger'

class Params
  # use your initialize to merge params from
  # 1. query string
  # 2. post body
  # 3. route params
  def initialize(req, route_params = {})
    @params = route_params
    parse_www_encoded_form(req.query_string) if req.query_string
    parse_www_encoded_form(req.body) if req.body
  end

  def [](key)
    @params[key]
  end

  def permit(*keys)
  end

  def require(key)
  end

  def permitted?(key)
  end

  def to_s
  end

  class AttributeNotFoundError < ArgumentError; end;


  # this should return deeply nested hash
  # argument format
  # user[address][street]=main&user[address][zip]=89436
  # should return
  # { "user" => { "address" => { "street" => "main", "zip" => "89436" } } }
  def parse_www_encoded_form(www_encoded_form)

    decoded_uri = URI::decode_www_form(www_encoded_form)
    decoded_uri.each do |key, value|
      keys = parse_key(key)
      new_hash = keys.reverse.inject(value) { |hash, key| { key => hash }}
      @params = merge_recursive(@params, new_hash)
    end
    @params
  end

  def merge_recursive(first, second)
    first.merge(second) {|key, first_val, second_val| merge_recursive(first_val, second_val) }
  end

  def parse_key(key)
    key.split(/\]\[|\[|\]/)
  end

end
