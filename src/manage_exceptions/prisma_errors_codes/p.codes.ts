export const PRISMA_ERROR_CODES_CLIENT_KNOW_REQUEST = {
  P2000: {
    message:
      "The provided value for the column is too long for the column's type. Column: {column_name}",
    httpCode: 400
  },
  P2001: {
    message:
      'The record searched for in the where condition ({model_name}.{argument_name} = {argument_value}) does not exist',
    httpCode: 404
  },
  P2002: {
    message: 'Unique constraint failed on the {constraint}',
    httpCode: 409
  },
  P2003: {
    message: 'Foreign key constraint failed on the field: {field_name}',
    httpCode: 409
  },
  P2004: {
    message: 'A constraint failed on the database: {database_error}',
    httpCode: 400
  },
  P2005: {
    message:
      "The value {field_value} stored in the database for the field {field_name} is invalid for the field's type",
    httpCode: 400
  },
  P2006: {
    message:
      'The provided value {field_value} for {model_name} field {field_name} is not valid',
    httpCode: 400
  },
  P2007: { message: 'Data validation error {database_error}', httpCode: 400 },
  P2008: {
    message:
      'Failed to parse the query {query_parsing_error} at {query_position}',
    httpCode: 400
  },
  P2009: {
    message:
      'Failed to validate the query: {query_validation_error} at {query_position}',
    httpCode: 400
  },
  P2010: {
    message: 'Raw query failed. Code: {code}. Message: {message}',
    httpCode: 500
  },
  P2011: {
    message: 'Null constraint violation on the {constraint}',
    httpCode: 400
  },
  P2012: { message: 'Missing a required value at {path}', httpCode: 400 },
  P2013: {
    message:
      'Missing the required argument {argument_name} for field {field_name} on {object_name}.',
    httpCode: 400
  },
  P2014: {
    message:
      "The change you are trying to make would violate the required relation '{relation_name}' between the {model_a_name} and {model_b_name} models.",
    httpCode: 400
  },
  P2015: {
    message: 'A related record could not be found. {details}',
    httpCode: 404
  },
  P2016: { message: 'Query interpretation error. {details}', httpCode: 400 },
  P2017: {
    message:
      'The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected.',
    httpCode: 400
  },
  P2018: {
    message: 'The required connected records were not found. {details}',
    httpCode: 404
  },
  P2019: { message: 'Input error. {details}', httpCode: 400 },
  P2020: {
    message: 'Value out of range for the type. {details}',
    httpCode: 400
  },
  P2021: {
    message: 'The table {table} does not exist in the current database.',
    httpCode: 404
  },
  P2022: {
    message: 'The column {column} does not exist in the current database.',
    httpCode: 404
  },
  P2023: { message: 'Inconsistent column data: {message}', httpCode: 400 },
  P2024: {
    message:
      'Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: {timeout}, connection limit: {connection_limit})',
    httpCode: 500
  },
  P2025: {
    message:
      'An operation failed because it depends on one or more records that were required but not found. {cause}',
    httpCode: 404
  },
  P2026: {
    message:
      "The current database provider doesn't support a feature that the query used: {feature}",
    httpCode: 400
  },
  P2027: {
    message:
      'Multiple errors occurred on the database during query execution: {errors}',
    httpCode: 500
  }
}
