import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`connected to mongoDB ${conn.connection.host}`)
  } catch (error) {
    console.log('Error connecting to MongoDB', error)
  }
}

export default connectToDB