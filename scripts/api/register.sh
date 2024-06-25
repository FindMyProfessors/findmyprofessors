# Check if the number of arguments is exactly one
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <username> <email> <password>"
    exit 1
fi


username=$1
email=$2
password=$3

echo $1 $2 $3



curl --location 'localhost:8080/api/auth/register' \
     --header 'Content-Type: application/json' \
     --data-raw "{
         \"username\": \"$username\",
         \"email\": \"$email\",
         \"password\": \"$password\"
     }"
