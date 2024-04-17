import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      try {
        const data = req.body;

        const { email, password } = data;

        if (
          !email ||
          !email.includes("@") ||
          !password ||
          password.trim().length < 7
        ) {
          res.status(422).json({ message: "Invalid input." });
          return;
        }

        const client = await connectToDatabase();
        const db = client.db();
        const usersCollection = db.collection("users");

        const hashedPassword = await hashPassword(password);

        const result = await usersCollection.insertOne({
          email: email,
          password: hashedPassword,
        });

        res.status(201).json({ message: "Created user!" });
      } catch (error) {
        res.status(500).json({ message: "Creating user failed!" });
      }

      break;
    default:
      break;
  }
}
