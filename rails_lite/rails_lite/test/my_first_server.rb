require 'webrick'

#root = File.expand_path '/'

server = WEBrick::HTTPServer.new(Port: 8080)

server.mount_proc '/' do |req, res|
  res.content_type = 'text/text'
  res.body = req.path
end


trap('INT') { server.shutdown }

server.start

#ruby -I lib test/02_params_server.rb to run server