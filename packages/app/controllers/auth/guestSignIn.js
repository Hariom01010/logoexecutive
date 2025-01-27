const UserService = require("../../services/User");
const dayjs = require("dayjs");

async function guestSignInController(req, res, next) {
    try{
        const userService = new UserService();

        const user = await userService.getUserByEmail(process.env.GUEST_EMAIL)

        if(user){
            res.cookie('jwt', user.generateJWT(), {
                expires: dayjs().add(1, 'day').toDate(),
                sameSite: "none",
                secure: true
            })
            res.send(200)
        }
    } catch (err){
        next(err)
    }
}

module.exports = guestSignInController