const process = require("process");
if (process.env.NODE_ENV !== "") require("dotenv").config();

const {
  APP_NAME,
  APP_PORT,
  APP_HOST,
  APP_BASE_URL,
  APP_DEBUG,
  DATABASE_URL,
  DATABASE_DIALECT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_QUERY_LOGGING,
  DATABASE_POOL_MAX,
  DATABASE_POOL_MIN,
  DATABASE_POOL_ACQUIRE,
  DATABASE_POOL_IDLE,
  NODE_ENV,
  JWT_ACCESS_SECRET_KEY,
  JWT_ACCESS_SECRET_TIME,
  JWT_REFRESH_SECRET_KEY,
  JWT_REFRESH_SECRET_TIME,
  CORS_ORIGIN_URL,
  CORS_METHOD,
  CORS_CREDENTIAL,
  CORS_ALLOWED_HEADERS,
  RATE_MAX_LIMIT,
  RATE_MAX_WINDOW_MS,
  CRYPT_SALT_SYNC,
  SWAGGER_SERVE,
  SWAGGER_VERSION,
  SWAGGER_DESCRIPTION,
  SWAGGER_CONTACT_NAME,
  SWAGGER_CONTACT_URL,
  SWAGGER_CONTACT_EMAIL,
  SWAGGER_BASE_PATH,
} = process.env;

exports.appKit = {
  environment: NODE_ENV || "development",
  name: APP_NAME || "Express App",
  port: parseInt(APP_PORT || "8000"),
  host: APP_HOST || "127.0.0.1",
  baseURL: APP_BASE_URL || `http://${host}:${port}`,
  debug: /^true$/i.test(APP_DEBUG || "false"),
};

exports.dbKit = {
  dialect: DATABASE_DIALECT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  port: parseInt(DATABASE_PORT || 3306),
  host: DATABASE_HOST || "127.0.0.1",
  database: DATABASE_NAME,
  databaseURL: DATABASE_URL || null,
  queryLogging: /^true$/i.test(DATABASE_QUERY_LOGGING || "false"),
  poolMax: parseInt(DATABASE_POOL_MAX || "100000"),
  poolMin: parseInt(DATABASE_POOL_MIN || "0"),
  poolAcquire: parseInt(DATABASE_POOL_ACQUIRE || "30000000"),
  poolIdle: parseInt(DATABASE_POOL_IDLE || "10000000"),
};

exports.jwtKit = {
  access: {
    key: JWT_ACCESS_SECRET_KEY,
    time: JWT_ACCESS_SECRET_TIME,
  },
  refresh: {
    key: JWT_REFRESH_SECRET_KEY,
    time: JWT_REFRESH_SECRET_TIME,
  },
};

exports.corsKit = {
  origin: CORS_ORIGIN_URL || "*",
  methods: CORS_METHOD.split(",") || ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: /^true$/i.test(CORS_CREDENTIAL || "true"),
  allowedHeaders: CORS_ALLOWED_HEADERS.split(",") || ["Content-Type", "Authorization", "Accept", "Origin"],
};

exports.rateLimitKit = {
  max: parseInt(RATE_MAX_LIMIT || "6000"),
  windowMs: parseInt(RATE_MAX_WINDOW_MS || "20"), // Hit per second
};

exports.cryptKit = {
  saltSync: CRYPT_SALT_SYNC,
};

exports.swaggerKit = {
  serve: /^true$/i.test(SWAGGER_SERVE || "false"),
  title: APP_NAME,
  version: SWAGGER_VERSION,
  description: SWAGGER_DESCRIPTION,
  contactName: SWAGGER_CONTACT_NAME,
  contactURL: SWAGGER_CONTACT_URL,
  contactEmail: SWAGGER_CONTACT_EMAIL,
  basePath: SWAGGER_BASE_PATH,
};
