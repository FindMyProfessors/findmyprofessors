# Check if the number of arguments is exactly one
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <email> <password>"
    exit 1
fi


email=$1
password=$2

echo $1 $2 $3


curl -X POST --location 'localhost:8080/api/auth/login' \
     --header 'Content-Type: application/json' \
     --data-raw "{
         \"email\": \"$email\",
         \"password\": \"$password\"
     }"
