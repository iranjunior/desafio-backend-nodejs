const UserModel = require("../Models/users");

const storeLocal =  async (request, response, User = UserModel) => {
    try {
        const { name, email, password, phones } = request.body;

        const exists = await User.checkUser(email);

        if (exists) {
            return response
                .status(403)
                .json({ message: "Usuario já cadastrado" })
                .send();
        }

        const user =  await User.create({
            name,
            email,
            password,
            phones
        });

        return response
            .status(201)
            .json({
                uuid: user.uuid,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                last_login: user.last_login,
                token: user.token
            })
            .send();
    } catch (error) {
        return response
            .status(500)
            .json({ error })
            .send();
    }
};

const showLocal = async (request, response, User = UserModel) => {
    try {
        const uuid = request.params.uuid;

        const user = await User.findForId(uuid);
        if (!user)
            return response
                .status(404)
                .json({
                    message: "Não Encontrado"
                })
                .send();

        const [, token] = request.headers.authorization.split(" ");

        if (token !== user.token)
            return response
                .status(401)
                .json({
                    message: "Não Autorizado"
                })
                .send();

        return response
            .status(200)
            .json(user)
            .send();
    } catch (error) {
        return response
            .status(500)
            .json(error)
            .send();
    }
};

module.exports = {
    store: (request, response) => storeLocal(request, response, UserModel),
    show: (request, response) => showLocal(request, response, UserModel),
    storeLocal,
    showLocal
};
