const config = {
    con: {
        connectionLimit : 100,
        host: "localhost",
        user: "root",
        password: "123456",
        database: "t2i"
    },
    jwt: {
        secret: "t2isecret",
        expire: "30d"
    },
    storage: {
        api_key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYxRjgwRjg3ODM3Nzc4MEI4ZTk2MjVBNGQwNGQ2RWQwRDg5YjEzNTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTQzNjMzODU1MSwibmFtZSI6InQyaSJ9.cvqHvG3S5SKgUkLdQnxwr1mck0SMVTNafyEkb4DbHX0"
    },
    dev_chain: {
        coinbase: "0xa6ba8a56b86f1466031c06ae97dda2bb9ea50249"
    },
    models: {
        image_type: "image/png",
        main_sd: "main_sd.py",
        main_mixer: "main_mixer.py"
    },
};

export default config;