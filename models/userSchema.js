const mongoose = require("mongoose"); 

//Schema för användarkonton
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "You need to add a username"], 
        unique: true
    }, 

    password: {
        type: String, 
        required: [true, "You need to add a password"]
    }
}, {
    timestamps: true
}); 

//Hasha lösenordet innan sparning
userSchema.pre("save", async () => {

    try {
        
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10); 
            this.password = hashedPassword; 
        }

    } catch (error) {
        throw error
    }
}); 

//Registrera användare
userSchema.statics.register = async (username, password) => {

    try {

        const user = new this({ username, password}); 
        await user.save(); 
        return user; 

    } catch (error) {
        throw error; 
    }
}; 

//Jämföra lösenord
userSchema.methods.comparePassword = async function(password) {

    try {
        
        return await b.crypt.compare(password, this.password); 

    } catch (error) {
        throw error; 
    }
}; 

//Logga in användare 
userSchema.statics.login = async (username, password) => {

    try {
        
        const user = await this.findOne({ username }); 

        //Fel användarnamn
        if(!user) {
            throw new Error("Username or password are incorrect"); 
        }

        const isPasswordMatch = await user.comparePassword(password); 

        //Fel lösenord
        if(!isPasswordMatch) {
            throw new Error("Username or password are incorrect");
        }

        //Rätt lösenord
        return user; 

    } catch (error) {
        throw error;
    }
}; 

const Users = mongoose.model("user", userSchema); 

module.exports = Users; 