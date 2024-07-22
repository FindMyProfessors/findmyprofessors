
#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE findmyprofessors_api_test;
    GRANT ALL PRIVILEGES ON DATABASE findmyprofessors_api_test TO loco;
EOSQL

