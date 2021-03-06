# frozen_string_literal: true

Sidekiq::Client.try(:reliable_push!) unless Rails.env.test?

Sidekiq.configure_server do |config|
  config.try(:reliable!)

  config.redis = System::Application.config.sidekiq
  config.error_handlers << System::ErrorReporting.method(:report_error)

  config.server_middleware do |chain|
    chain.add ThreeScale::Analytics::SidekiqMiddleware
    chain.add ThreeScale::SidekiqRetrySupport::Middleware
  end

  faraday = ThreeScale::Core.faraday
  faraday.options.timeout = 30
  faraday.options.open_timeout = 10

  schedule_file = Rails.root.join('config', 'sidekiq_schedule.yml')

  if File.exist?(schedule_file) && Sidekiq.server?
    Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
  end
end

Sidekiq.configure_client do |config|
  config.redis = System::Application.config.sidekiq

  config.client_middleware do |chain|
    chain.add ThreeScale::SidekiqLoggingMiddleware
  end
end
