# practice-sequelize-jest
sequelize를 사용하는 프로젝트에서 jest를 이용해 db 테스트하기


Sequelize 를 사용할 때, db 테스트 코드를 짜고 싶을 때가 있다. 그때 sqlite memory db를 이용할 수 있는 방법이다.

전체 프로젝트는 여기에서 볼 수 있다. 현재 sequelize-typescript는 sequelize를 5버전까지 지원한다.

---

1. Model 만들기. 
    1. 간단하게 id와 이름을 받게 했다.

    ```jsx
    @Table
    export default class User extends Model<User> {
        @AutoIncrement
        @PrimaryKey
        @AllowNull(false)
        @Column(DataType.INTEGER)
        id: number;

        @Column(DataType.STRING)
        name: string;

        @CreatedAt
        createdAt: Date;

        @UpdatedAt
        updatedAt: Date;
    }
    ```

2. Sequelize sqlite 초기화하기
    1. 테스트 코드 안에서 sqlite 를 생성하고 User를 넣어 테이블을 생성하게 한다.

    ```jsx
    beforeEach(async () => {
        const dbConnection = new Sequelize(`sqlite::memory:`, {logging: false});
        dbConnection.addModels([User]);
        await dbConnection.sync({force: true});
    });
    ```

3. 검증하기
    1. save - find 가 잘 동작하는지 확인한다.

    ```jsx
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
    ```
   
---

## 사용한 모듈
sequelize: 5.22.3 \
sequelize-typescript: 1.1.0 \
jest: 26.4.2 \
sqlite3: 5.0.0 \
typescript: 4.0.3 \
reflect-metadata: 0.1.13
