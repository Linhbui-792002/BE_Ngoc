import mongoose from "mongoose";

const connect = async () => {
  try {
    let connection = await mongoose.connect(process.env.CONNECTION);
    console.log("connect mongoose successfull");
    return connection;
  } catch (error) {
    // let errorMessage = error.code
    console.log("Cannot connect to mongoDb " + error);
  }
};

export default connect;
