const userModel = require('../model/user.js');


const getUserData = async (req, res) => {

    const { userId } = req.body;

    try {

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({success: false, message: 'Usuário não encontrado'});
        }

        res.status(200).json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

}

module.exports = getUserData;