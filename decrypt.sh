echo "Enter the password, the press ENTER: "
openssl enc -in .env.enc \
    -d -aes-256-cbc -pbkdf2 \
    -pass stdin > .env