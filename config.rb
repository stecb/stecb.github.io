###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
page "/memorysta/index.html", layout: :memorysta
page "/cv/index.html", layout: :cv

# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
set :file_watcher_ignore, [
    /^\.idea\//,
    /^\.bundle\//,
    /^\.sass-cache\//,
    /^\.git\//,
    /^\.gitignore$/,
    /\.DS_Store/,
    /^build\//,
    /^\.rbenv-.*$/,
    /^Gemfile$/,
    /^Gemfile\.lock$/,
    /~$/,
    /(^|\/)\.?#/
]
activate :livereload

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

sprockets.append_path File.join root.to_s, "bower_components"

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_path, "/Content/images/"
  activate :minify_css
  activate :minify_javascript
  activate :minify_html
  activate :asset_hash
end

after_configuration do
  sprockets.append_path File.join root.to_s, "bower_components"
end

activate :deploy do |deploy|
  deploy.method = :git
  # Optional Settings
  # deploy.remote   = 'custom-remote' # remote name or git url, default: origin
  deploy.branch   = 'master' # default: gh-pages
  # deploy.strategy = :submodule      # commit strategy: can be :force_push or :submodule, default: :force_push
  # deploy.commit_message = 'custom-message'      # commit message (can be empty), default: Automated commit at `timestamp` by middleman-deploy `version`
end