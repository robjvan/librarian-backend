/** Config values accessable within the app through the ConfigService */
export interface IConfig {
  env: string; // 'local' | 'development' | 'staging' | 'production';
  name: string;
  projectId: string;
  httpPort: string | number;
  ip: string;

  android_package: string;
  ios_package: string;

  corsOrigin: null | string | string[];
  secure_auth_cookie: boolean;

  root: string;
  assetDirectory: string;
  serviceKeyAssetPath: string;

  bcrypt_rounds: number;

  seedDB: boolean;
  mockSyncSeedDB: boolean;

  sql_username: string;
  sql_host: string;
  sql_port: number;
  sql_db: string;
  sql_logging: boolean;
  sql_instance: string;

  debug_enableAgent: boolean;
  debug_enableCanary: boolean;
  enableStackdriverReporting: boolean;

  storageBucket: string;

  webAppUrl: string;
  appStoreUrl: string;
  googlePlayUrl: string;

  sms_accountSID: string;
  sms_phone: string;

  email_username: string;
  email_uri_part: string;
  email_from: string;
  email_error: string;

  userRoles: string[];

  stripe_tax_percent: number;

  mailchimp_user: string;
  mailchimp_dc: string;
  mailchimp_list_trial: string;
  mailchimp_list_subscribed: string;
  mailchimp_list_master: string;

  sub_plan_monthly_stripe_id: string;
  sub_plan_monthly_apple_product_id: string;
  sub_plan_monthly_fee: number;
  sub_plan_monthly_enumValue: number;

  sub_plan_annually_stripe_id: string;
  sub_plan_annually_apple_product_id: string;
  sub_plan_annually_fee: number;
  sub_plan_annually_enumValue: number;

  sub_plan_monthly_google_id: string;
  sub_plan_annually_google_id: string;

  google_notification_sub_name: string;
  test_google_notification_api: string;

  appstore_key_key_id: string;
  appstore_key_key_issuer: string;
  appstore_key_audience: string;

  // ppjs_api_base_url: string;
  // ppjs_client_id: string;

  itunes_receipt_validation_url: string;

  appstore_expected_env: string /** 'Sandbox' | 'PROD' */;
  sandbox_notification_api: string;

  max_failed_login_attempts: number;
  login_lockout_minutes: number;
  login_failed_period_minutes: number;

  // medispan_api_base_url: string;
  // medispan_user: string;
  pub_sub_enabled: boolean;
}

/** Internally generated directory helpers */
export interface IDirectories {
  rootDirectory: string;
  assetDirectory: string;
}

/** Environment values are provided in local config or deployment environment */
export interface IEnvironment extends Partial<ISecrets> {
  PORT: string;
  IP: string;
  NODE_ENV: string;
  ORIGIN_WHITELIST: string;
  SECURE_AUTH_COOKIE: string; // boolean TRUE / FALSE
  SQL_USER: string;
  SQL_HOST: string;
  SQL_PORT: string;
  SQL_DB: string;
  SQL_LOGGING: string; // boolean TRUE / FALSE
  SQL_INSTANCE: string;
  GCLOUD_STORAGE_BUCKET: string;
  APPSTORE_ENV: string;
  PROJECT_ID: string;
  ANDROID_PACKAGE: string;
  IOS_PACKAGE: string;
  DEBUG_AGENT: string; // boolean TRUE / FALSE
  STACKDRIVER_REPORTING: string; // boolean TRUE / FALSE
  SMS_SID: string;
  SMS_PHONE: string;
  APPSTORE_KEY_ID: string;
  APPSTORE_KEY_ISSUER: string;
  APPSTORE_KEY_AUDIENCE: string;
  MAILCHIMP_USER: string;
  WEBAPP_URL: string;
  ITUNES_RECEIPT_URL: string;
  STRIPE_PLAN_ID_MONTHLY: string;
  STRIPE_PLAN_ID_ANNUALLY: string;
  GOOGLE_PLAN_ID_MONTHLY: string;
  GOOGLE_PLAN_ID_ANNUALLY: string;
  GOOGLE_NOTIFICATION_SUB_NAME: string;
  TEST_GOOGLE_NOTIFICATION_API: string;
  TEST_APPLE_NOTIFICATION_API: string;
  MAX_FAILED_LOGIN_ATTEMPTS: string; // number
  LOGIN_LOCKOUT_MINUTES: string; // number
  LOGIN_FAILED_PERIOD_MINUTES: string; // number
  ERROR_EMAIL: string;
  MEDISPAN_API_BASE_URL: string;
  MEDISPAN_USER: string;
  PUB_SUB_ENABLED: string; // boolean TRUE / FALSE
}
/** Secrets are provided either by local config or Google Cloud */
export interface ISecrets {
    NODE_ENV: string;
    SQL_PASSWORD: string;
    SESSION_SECRET: string;
    IMPERSONATION_SECRET: string;
    INTEGRATION_SECRET: string;
    EMAIL_PASSWORD: string;
    MAILCHIMP_KEY: string;
    STRIPE_KEY: string;
    STRIPE_SECRET: string;
    TWILIO_TOKEN: string;
    ITUNES_PASSWORD: string;
    APPSTORE_S2S_PASSWORD: string;
    RECAPTCHA_SITE_KEY: string;
    FIREBASE_WEB_KEY: string;
    APPSTORE_P8_AUTH_KEY: string;
    PPJS_API_BASE_URL: string;
    PPJS_CLIENT_ID: string;
    PPJS_CLIENT_SECRET: string;
    WEBAPP_URL: string;
    MEDISPAN_PASSWORD: string;
    GOOGLE_PLAY_SERVICE_KEY: string;
}