const UserModelMock = require("../Utils/generateUserModelMock");
const { destroyLocal } = require("../../src/App/Controllers/userController");
const Regex = require("randexp");
const user = {};
const responseMock = () => ({
    status: statusLocal => ({
        json: objectLocal => ({
            send: objectLocalOption => ({
                status: statusLocal,
                body: { ...objectLocal, ...objectLocalOption }
            })
        })
    })
});

describe("Testar o destroy no controller", () => {
    it("Deve apagar usuario com sucesso", async () => {
        const response = await destroyLocal(
            { headers: { authorization: `Bearer ${new Regex(/ .+/).gen()}` } },
            responseMock(),
            UserModelMock().deleteUserSucess()
        );
        console.log("response :", response);
        expect(response.status).toBe(200);
    });
});
