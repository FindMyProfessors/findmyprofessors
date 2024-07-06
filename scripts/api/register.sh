# Check if the number of arguments is exactly one
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <username> <email> <password>"
    exit 1
fi


username=$1
email=$2
password=$3

echo $1 $2 $3



curl -X POST 'http://localhost:8080/auth/register' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
         \"username\": \"$username\",
         \"email\": \"$email\",
         \"password\": \"$password\"
     }"
