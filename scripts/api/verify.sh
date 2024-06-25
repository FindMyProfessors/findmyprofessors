
# Check if the number of arguments is exactly one
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <token>"
    exit 1
fi

token=$1

echo $1

curl --location 'localhost:8080/api/auth/verify' \
     --header 'Content-Type: application/json' \
     --data "{
         \"token\": \"$token\"
     }"

