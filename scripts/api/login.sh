# Check if the number of arguments is exactly one
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <username> <password>"
    exit 1
fi

username=$1
password=$2

echo $1 $2 $3

curl -X POST 'http://localhost:8080/auth/login' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d "{
         \"username\": \"$username\",
         \"password\": \"$password\"
     }"
