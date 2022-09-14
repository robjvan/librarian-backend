import { IConfig, IEnvironment, ISecrets } from "./config.interface";
import { IDirectories } from "./config.interface";

export function parseBool(value: string): boolean {
  if (!value) return false;
  else if (value?.toLowerCase() === "true") return true;
  else return false;
}

export function parseNum(value: string | number, defaultValue: number): number {
  if (value === null || value === undefined) return defaultValue;
  else if (typeof value == "number") return value;
  else {
      try {
          const num = parseInt(value, 10);
          return num;
      } catch (error) {
          console.log("Failed to parse num for config", error);
          return defaultValue;
      }
  }
}

export function parseCors(value: string): null | string | string[] {
  console.log("parsing CORS value", value);
  if (!value) return null;
  try {
      const values = value.split(";");
      if (values.length == 1) return values[0];
      else return values;
  } catch (error) {
      console.error("Error parsing ENV array with value: " + value, error);
      return null;
  }
}

export function environmentConfigFactory(env: {
  [key: string]: string | undefined;
}): IEnvironment {
  const environment: IEnvironment = {
      // required values
      PORT: env["PORT"],
      IP: env["IP"],
      NODE_ENV: env["NODE_ENV"],
      ORIGIN_WHITELIST: env["ORIGIN_WHITELIST"],
      SECURE_AUTH_COOKIE: env["SECURE_AUTH_COOKIE"],
      SQL_USER: env["SQL_USER"],
      SQL_HOST: env["SQL_HOST"],
      SQL_PORT: env["SQL_PORT"],
      SQL_DB: env["SQL_DB"],
      SQL_LOGGING: env["SQL_LOGGING"],
      SQL_INSTANCE: env["SQL_INSTANCE"],
      GCLOUD_STORAGE_BUCKET: env["GCLOUD_STORAGE_BUCKET"],
      APPSTORE_ENV: env["APPSTORE_ENV"],
      PROJECT_ID: env["PROJECT_ID"],
      ANDROID_PACKAGE: env["ANDROID_PACKAGE"],
      IOS_PACKAGE: env["IOS_PACKAGE"],
      DEBUG_AGENT: env["DEBUG_AGENT"],
      STACKDRIVER_REPORTING: env["STACKDRIVER_REPORTING"],
      SMS_SID: env["SMS_SID"],
      SMS_PHONE: env["SMS_PHONE"],
      APPSTORE_KEY_ID: env["APPSTORE_KEY_ID"],
      APPSTORE_KEY_ISSUER: env["APPSTORE_KEY_ISSUER"],
      APPSTORE_KEY_AUDIENCE: env["APPSTORE_KEY_AUDIENCE"],
      MAILCHIMP_USER: env["MAILCHIMP_USER"],
      WEBAPP_URL: env["WEBAPP_URL"],
      ITUNES_RECEIPT_URL: env["ITUNES_RECEIPT_URL"],
      STRIPE_PLAN_ID_MONTHLY: env["STRIPE_PLAN_ID_MONTHLY"],
      STRIPE_PLAN_ID_ANNUALLY: env["STRIPE_PLAN_ID_ANNUALLY"],
      MAX_FAILED_LOGIN_ATTEMPTS: env["MAX_FAILED_LOGIN_ATTEMPTS"],
      LOGIN_LOCKOUT_MINUTES: env["LOGIN_LOCKOUT_MINUTES"],
      LOGIN_FAILED_PERIOD_MINUTES: env["LOGIN_FAILED_PERIOD_MINUTES"],
      ERROR_EMAIL: env["ERROR_EMAIL"],
      MEDISPAN_API_BASE_URL: env["MEDISPAN_API_BASE_URL"],
      MEDISPAN_USER: env["MEDISPAN_USER"],
      MEDISPAN_PASSWORD: env["MEDISPAN_PASSWORD"],
      GOOGLE_PLAN_ID_MONTHLY: env["GOOGLE_PLAN_ID_MONTHLY"],
      GOOGLE_PLAN_ID_ANNUALLY: env["GOOGLE_PLAN_ID_ANNUALLY"],
      GOOGLE_NOTIFICATION_SUB_NAME: env["GOOGLE_NOTIFICATION_SUB_NAME"],
      TEST_GOOGLE_NOTIFICATION_API: env["TEST_GOOGLE_NOTIFICATION_API"],
      TEST_APPLE_NOTIFICATION_API: env["TEST_APPLE_NOTIFICATION_API"],
      PUB_SUB_ENABLED: env["PUB_SUB_ENABLED"],

      // optional secrets
      SQL_PASSWORD: env["SQL_PASSWORD"],
      SESSION_SECRET: env["SESSION_SECRET"],
      IMPERSONATION_SECRET: env["IMPERSONATION_SECRET"],
      INTEGRATION_SECRET: env["INTEGRATION_SECRET"],
      EMAIL_PASSWORD: env["EMAIL_PASSWORD"],
      MAILCHIMP_KEY: env["MAILCHIMP_KEY"],
      STRIPE_KEY: env["STRIPE_KEY"],
      STRIPE_SECRET: env["STRIPE_SECRET"],
      TWILIO_TOKEN: env["TWILIO_TOKEN"],
      ITUNES_PASSWORD: env["ITUNES_PASSWORD"],
      APPSTORE_S2S_PASSWORD: env["APPSTORE_S2S_PASSWORD"],
      APPSTORE_P8_AUTH_KEY: env["APPSTORE_P8_AUTH_KEY"],
      RECAPTCHA_SITE_KEY: env["RECAPTCHA_SITE_KEY"],
      FIREBASE_WEB_KEY: env["FIREBASE_WEB_KEY"],
      PPJS_API_BASE_URL: env["PPJS_API_BASE_URL"],
      PPJS_CLIENT_ID: env["PPJS_CLIENT_ID"],
      PPJS_CLIENT_SECRET: env["PPJS_CLIENT_SECRET"],
  };

  /// Removed for security reasons / fortify
  ///console.log("Parsed Environment", environment);

  return environment;
}

export function defaultSecretConfigFactory(
  environment: IEnvironment
): ISecrets {
  const secrets = {
      NODE_ENV: environment["NODE_ENV"],
      SQL_PASSWORD: environment["SQL_PASSWORD"],
      SESSION_SECRET: environment["SESSION_SECRET"],
      IMPERSONATION_SECRET: environment["IMPERSONATION_SECRET"],
      INTEGRATION_SECRET: environment["INTEGRATION_SECRET"],
      EMAIL_PASSWORD: environment["EMAIL_PASSWORD"],
      MAILCHIMP_KEY: environment["MAILCHIMP_KEY"],
      STRIPE_KEY: environment["STRIPE_KEY"],
      STRIPE_SECRET: environment["STRIPE_SECRET"],
      TWILIO_TOKEN: environment["TWILIO_TOKEN"],
      ITUNES_PASSWORD: environment["ITUNES_PASSWORD"],
      APPSTORE_S2S_PASSWORD: environment["APPSTORE_S2S_PASSWORD"],
      APPSTORE_P8_AUTH_KEY: environment["APPSTORE_P8_AUTH_KEY"],
      RECAPTCHA_SITE_KEY: environment["RECAPTCHA_SITE_KEY"],
      FIREBASE_WEB_KEY: environment["FIREBASE_WEB_KEY"],
      PPJS_API_BASE_URL: environment["PPJS_API_BASE_URL"],
      PPJS_CLIENT_ID: environment["PPJS_CLIENT_ID"],
      PPJS_CLIENT_SECRET: environment["PPJS_CLIENT_SECRET"],
      WEBAPP_URL: environment["WEBAPP_URL"],
      MEDISPAN_API_BASE_URL: environment["MEDISPAN_API_BASE_URL"],
      MEDISPAN_USER: environment["MEDISPAN_USER"],
      MEDISPAN_PASSWORD: environment["MEDISPAN_PASSWORD"],
      GOOGLE_PLAY_SERVICE_KEY: environment["GOOGLE_PLAY_SERVICE_KEY"],
  };
  return secrets;
}

export function defaultConfigFactory(
  environment: IEnvironment,
  directories: IDirectories
): IConfig {
  return {
      env: environment.NODE_ENV,
      projectId: environment.PROJECT_ID || "", //TODO: Add project ID here
      name: "librarian-backend",
      ip: process.env.IP || "0.0.0.0",

      android_package:
          environment.ANDROID_PACKAGE || "ca.eastcoastdev.librarian",
      ios_package: environment.IOS_PACKAGE || "ca.eastcoastdev.librarian",

      corsOrigin: parseCors(environment.ORIGIN_WHITELIST),
      secure_auth_cookie: parseBool(environment.SECURE_AUTH_COOKIE),

      root: directories.rootDirectory,
      assetDirectory: directories.assetDirectory,
      serviceKeyAssetPath: "./librarian.json",

      httpPort: environment.PORT || 9000,
      debug_enableAgent: parseBool(environment.DEBUG_AGENT),
      debug_enableCanary: parseBool(environment.DEBUG_AGENT),

      enableStackdriverReporting: parseBool(
          environment.STACKDRIVER_REPORTING
      ),
      storageBucket: environment.GCLOUD_STORAGE_BUCKET,

      // Should we populate the DB with sample data?
      seedDB: false,
      mockSyncSeedDB: false,

      webAppUrl:
          environment.WEBAPP_URL || "https://app.yourlibrarian.ca/",
      appStoreUrl:
          "https://apps.apple.com/ca/app/", //TODO: Fix iOS URL
      googlePlayUrl:
          "https://play.google.com/store/apps/details?id=ca.eastcoastdev.librarian",

      sql_username: environment.SQL_USER,
      sql_host: environment.SQL_HOST,
      sql_port:
          environment.SQL_PORT != null
              ? parseInt(environment.SQL_PORT, 10)
              : 3306,
      sql_db: environment.SQL_DB,
      sql_logging: parseBool(environment.SQL_LOGGING),
      sql_instance: environment.SQL_INSTANCE,

      // SMS server
      sms_accountSID: environment.SMS_SID,
      sms_phone: environment.SMS_PHONE,

      bcrypt_rounds: 2,

      email_username: "librarian@mail.yourlibrarian.ca",
      email_uri_part: `smtp://{username}:{password}@smtp.mailgun.org`, //TODO: Fix email server settings
      email_from: "chronicallysimple@mail.yourlibrarian.ca",
      email_error: environment.ERROR_EMAIL,

      // shared
      userRoles: ["guest", "user", "admin"],

      stripe_tax_percent: 13,

      mailchimp_user: environment.MAILCHIMP_USER,
      mailchimp_dc: "0000",
      mailchimp_list_trial: "0000000",
      mailchimp_list_subscribed: "0000000",
      mailchimp_list_master: "000000",

      sub_plan_monthly_stripe_id:
          environment.STRIPE_PLAN_ID_MONTHLY || "0000000",
      sub_plan_monthly_apple_product_id: "ca.eastcoastdev.librarian.monthly",
      sub_plan_monthly_fee: 1.99,
      sub_plan_monthly_enumValue: 1,
      sub_plan_annually_stripe_id:
          environment.STRIPE_PLAN_ID_ANNUALLY || "plan_DJDphsWVtB7Zms",
      sub_plan_annually_apple_product_id: "ca.eastcoastdev.librarian.annually",
      sub_plan_annually_fee: 19.99,
      sub_plan_annually_enumValue: 2,

      sub_plan_monthly_google_id:
          environment.GOOGLE_PLAN_ID_MONTHLY ||
          "ca.eastcoastdev.librarian.monthly",
      sub_plan_annually_google_id:
          environment.GOOGLE_PLAN_ID_ANNUALLY ||
          "ca.eastcoastdev.librarian.annually",

      google_notification_sub_name: environment.GOOGLE_NOTIFICATION_SUB_NAME,
      test_google_notification_api: environment.TEST_GOOGLE_NOTIFICATION_API,

      appstore_key_key_id: environment.APPSTORE_KEY_ID,
      appstore_key_key_issuer: environment.APPSTORE_KEY_ISSUER,
      appstore_key_audience: environment.APPSTORE_KEY_AUDIENCE,

      itunes_receipt_validation_url:
          environment.ITUNES_RECEIPT_URL ||
          "https://buy.itunes.apple.com/verifyReceipt",

      appstore_expected_env: environment.APPSTORE_ENV,
      sandbox_notification_api: environment.TEST_APPLE_NOTIFICATION_API,

      max_failed_login_attempts: parseNum(
          environment.MAX_FAILED_LOGIN_ATTEMPTS,
          5
      ),
      login_lockout_minutes: parseNum(environment.LOGIN_LOCKOUT_MINUTES, 60),
      login_failed_period_minutes: parseNum(
          environment.LOGIN_FAILED_PERIOD_MINUTES,
          5
      ),
      pub_sub_enabled: parseBool(environment.PUB_SUB_ENABLED),
      //recaptcha_site_key: environment.RECAPTCHA_SITE_KEY,
  };
}
