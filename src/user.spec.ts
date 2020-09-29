import {Sequelize} from "sequelize-typescript";
import User from './user';

describe("User Test", () => {
    beforeEach(async () => {
        const dbConnection = new Sequelize(`sqlite::memory:`, {logging: false});
        dbConnection.addModels([User]);
        await dbConnection.sync({force: true});
    });

    it("save - find", async () => {
        // given
        expect(await User.findAll()).toHaveLength(0);

        // when
        await User.create({
            name: 'user'
        });

        // then
        expect(await User.findAll()).toHaveLength(1);
        expect(await User.findOne({where: {name: 'user'}})).toBeTruthy()
    });
});
