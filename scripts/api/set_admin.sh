# Check if the number of arguments is exactly one
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <user_id>"
    exit 1
fi

user_id=$1

# Determine the root directory
ROOT_DIR=$(git rev-parse --show-toplevel 2>/dev/null || echo "$(dirname "$0")/../..")

# Load environment variables from .env file
export $(grep -v '^#' "$ROOT_DIR/api/.env" | xargs)

docker run -dit --network host --name=pgclient codingpuss/postgres-client
docker exec -it pgclient psql $DATABASE_URL -c "UPDATE public.\"User\" SET role = 'ADMIN' WHERE id = '$user_id'"
echo "Shutting down pgclient"
docker stop pgclient
docker rm pgclient

echo "User $user_id is now an admin"