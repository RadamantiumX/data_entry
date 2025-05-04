export const PRISMA_ERROR_CODES = {
  P1000: 'Authentication failed',
  P1001: "Can't reach database",
  P1002: 'The database server was reached but timed out',
  P1003: 'Database File Name does not exist at file path',
  P1008: 'Operation timed out',
  P1009: 'Database already exists on Database server',
  P1010: 'Denied access to current User',
  P1011: 'Error opening a TLS connection',
  P1012:
    'See on documentation P1012 ERROR CODE: https://www.prisma.io/docs/orm/reference/error-reference#prismaclientknownrequesterror',
  P1013: 'The provided database string is invalid',
  P1014: 'The underlying {kind} for model {model} does not exist.',
  P1015:
    'Your Prisma schema is using features that are not supported for the version of the database.Database version: {database_version} Errors:{errors}',
  P1016:
    'Your raw query had an incorrect number of parameters. Expected: {expected}, actual: {actual}.',
  P1017: 'Server has closed the connection.',
  P2000:
    "The provided value for the column is too long for the column's type. Column: {column_name}",
  P2001:
    'The record searched for in the where condition ({model_name}.{argument_name} = {argument_value}) does not exist',
  P2002: 'Unique constraint failed on the {constraint}',
  P2003: 'Foreign key constraint failed on the field: {field_name}',
  P2004: 'A constraint failed on the database: {database_error}',
  P2005:
    "The value {field_value} stored in the database for the field {field_name} is invalid for the field's type",
  P2006:
    'The provided value {field_value} for {model_name} field {field_name} is not valid',
  P2007: 'Data validation error {database_error}',
  P2008: 'Failed to parse the query {query_parsing_error} at {query_position}',
  P2009:
    'Failed to validate the query: {query_validation_error} at {query_position}',
  P2010: 'Raw query failed. Code: {code}. Message: {message}',
  P2011: 'Null constraint violation on the {constraint}',
  P2012: 'Missing a required value at {path}',
  P2013:
    'Missing the required argument {argument_name} for field {field_name} on {object_name}.',
  P2014:
    "The change you are trying to make would violate the required relation '{relation_name}' between the {model_a_name} and {model_b_name} models.",
  P2015: 'A related record could not be found. {details}',
  P2016: 'Query interpretation error. {details}',
  P2017:
    'The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected.',
  P2018: 'The required connected records were not found. {details}',
  P2019: 'Input error. {details}',
  P2020: 'Value out of range for the type. {details}',
  P2021: 'The table {table} does not exist in the current database.',
  P2022: 'The column {column} does not exist in the current database.',
  P2023: 'Inconsistent column data: {message}',
  P2024:
    'Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: {timeout}, connection limit: {connection_limit})',
  P2025:
    'An operation failed because it depends on one or more records that were required but not found. {cause}',
  P2026:
    "The current database provider doesn't support a feature that the query used: {feature}",
  P2027:
    'Multiple errors occurred on the database during query execution: {errors}',
  P2028: 'Transaction API error: {error}',
  P2029: 'Query parameter limit exceeded error: {message}',
  P2030:
    'Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema',
  P2031:
    'Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set',
  P2033:
    "A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers",
  P2034:
    'Transaction failed due to a write conflict or a deadlock. Please retry your transaction',
  P2035: 'Assertion violation on the database: {database_error}',
  P2036: 'Error in external connector (id {id})',
  P2037: 'Too many database connections opened: {message}',
  P3000: 'Failed to create database: {database_error}',
  P3001:
    'Migration possible with destructive changes and possible data loss: {migration_engine_destructive_details}',
  P3002: 'The attempted migration was rolled back: {database_error}',
  P3003:
    'The format of migrations changed, the saved migrations are no longer valid. To solve this problem, please follow the steps at: https://pris.ly/d/migrate',
  P3004:
    'The {database_name} database is a system database, it should not be altered with prisma migrate. Please connect to another database.',
  P3005:
    'The database schema is not empty. Read more about how to baseline an existing production database: https://pris.ly/d/migrate-baseline',
  P3006:
    'Migration {migration_name} failed to apply cleanly to the shadow database.{error_code}Error:{inner_error}',
  P3007:
    'Some of the requested preview features are not yet allowed in schema engine. Please remove them from your data model before using migrations. (blocked: {list_of_blocked_features})',
  P3008:
    'The migration {migration_name} is already recorded as applied in the database.',
  P3009:
    'migrate found failed migrations in the target database, new migrations will not be applied. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve{details}',
  P3010:
    'The name of the migration is too long. It must not be longer than 200 characters (bytes).',
  P3011:
    'Migration {migration_name} cannot be rolled back because it was never applied to the database.',
  P3012:
    'Migration {migration_name} cannot be rolled back because it is not in a failed state.',
  P3013:
    'Datasource provider arrays are no longer supported in migrate. Please change your datasource to use a single provider. Read more at https://pris.ly/multi-provider-deprecation',
  P3014:
    'Prisma Migrate could not create the shadow database. Please make sure the database user has permission to create databases.',
  P3015:
    'Could not find the migration file at {migration_file_path}. Please delete the directory or restore the migration file.',
  P3016:
    'The fallback method for database resets failed, meaning Migrate could not clean up the database entirely. Original error: {error_code}{inner_error}',
  P3017:
    'The migration {migration_name} could not be found. Please make sure that the migration exists, and that you included the whole name of the directory.',
  P3018:
    'A migration failed to apply. New migrations cannot be applied before the error is recovered from.',
  P3019:
    'The datasource provider {provider} specified in your schema does not match the one specified in the migration_lock.toml, {expected_provider}. Please remove your current migration directory and start a new migration history with prisma migrate dev. Read more: https://pris.ly/d/migrate-provider-switch',
  P3020:
    'The automatic creation of shadow databases is disabled on Azure SQL. Please set up a shadow database using the shadowDatabaseUrl datasource attribute. Read the docs page for more details: https://pris.ly/d/migrate-shadow',
  P3021:
    'Foreign keys cannot be created on this database. Learn more how to handle this: https://pris.ly/d/migrate-no-foreign-keys',
  P3022:
    'Direct execution of DDL (Data Definition Language) SQL statements is disabled on this database. Please read more here about how to handle this: https://pris.ly/d/migrate-no-direct-ddl',
  P4000:
    'Introspection operation failed to produce a schema file: {introspection_error}',
  P4001: 'The introspected database was empty.',
  P4002:
    'The schema of the introspected database was inconsistent: {explanation}',
  P6000: 'Generic error to catch all other errors.',
  P6001:
    'The URL is malformed; for instance, it does not use the prisma:// protocol.',
  P6002: 'The API Key in the connection string is invalid.',
  P6003:
    'The included usage of the current plan has been exceeded. This can only occur on the free plan.',
  P6004: 'The global timeout of Accelerate has been exceeded',
  P6005:
    'The user supplied invalid parameters. Currently only relevant for transaction methods. For example, setting a timeout that is too high. https://www.prisma.io/docs/accelerate/connection-pooling#interactive-transactions-query-timeout-limit',
  P6006:
    'The chosen Prisma version is not compatible with Accelerate. This may occur when a user uses an unstable development version that we occasionally prune.',
  P6008:
    "The engine failed to start. For example, it couldn't establish a connection to the database.",
  P6009:
    'The global response size limit of Accelerate has been exceeded. https://www.prisma.io/docs/accelerate/connection-pooling#response-size-limit',
  P6010:
    'Your accelerate project is disabled. Please enable it again to use it.: https://www.prisma.io/docs/accelerate/getting-started#1-enable-accelerate',
  P5011:
    'This error indicates that the request volume exceeded. Implement a back-off strategy and try again later. For assistance with expected high workloads, contact support.: https://www.prisma.io/docs/platform/support'
}
