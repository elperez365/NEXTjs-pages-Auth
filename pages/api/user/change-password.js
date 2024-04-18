import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

export default async function handler(req, res) {
  const session = req.body.session;
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  switch (req.method) {
    case "PATCH":
      const userEmail = session.user.email;
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;

      const client = await connectToDatabase();
      const usersCollection = client.db().collection("users");
      const user = await usersCollection.findOne({ email: userEmail });
      if (!user) {
        res.status(404).json({ message: "User not found." });
        client.close();
        return;
      }

      const currentPassword = user.password;
      const checkOldPassword = await verifyPassword(
        oldPassword,
        currentPassword
      );
      if (!checkOldPassword) {
        res.status(403).json({ message: "check old password!!" });
        client.close();
        return;
      }

      const hashedPassword = await hashPassword(newPassword);

      const result = await usersCollection.updateOne(
        { email: userEmail },
        { $set: { password: hashedPassword } }
      );
      console.log(result);
      client.close();
      res.status(200).json({ message: "Password updated!" });
      break;
    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  return;
}
