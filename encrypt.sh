echo "Enter the password, the press ENTER: "
openssl enc -in .env \
    -aes-256-cbc -pbkdf2 \
    -pass stdin > .env.enc