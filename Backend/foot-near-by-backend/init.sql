-- Connect as postgres superuser
\c postgres;

-- Create database first
CREATE DATABASE footnearbydb;

-- Create user if not exists
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'footnearby') THEN
      CREATE USER footnearby WITH PASSWORD 'footnearby';
   END IF;
END
$do$;

-- Grant privileges
ALTER USER footnearby WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE footnearbydb TO footnearby;

-- Connect to the new database
\c footnearbydb;

-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;