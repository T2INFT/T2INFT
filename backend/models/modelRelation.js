import User from "./user.js";
import T2Image from "./t2image.js";
import Transaction from "./transaction.js";

console.log("--set model relation--");
User.hasMany(T2Image, { foreignKey: "userid" });
T2Image.belongsTo(User, { foreignKey: "userid" });

User.hasMany(Transaction, { foreignKey: "userid" });
Transaction.belongsTo(User, { foreignKey: "userid" });

T2Image.hasMany(Transaction, { foreignKey: "imgid" });
Transaction.belongsTo(T2Image, { foreignKey: "imgid" });
