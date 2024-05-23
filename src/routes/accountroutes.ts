import express from "express";
const router = express.Router();
import { authenticateUser,authorizePermissions } from "../middleware/authentication";
import {
  getAllAccounts,
  getSingleAccount,
  updateAccount,
  deleteAccount,
} from "../Controllers/accountController";

router.route("/").get( [authenticateUser], getAllAccounts);

router
  .route("/:id")
  .get([authenticateUser,authorizePermissions('admin')],getSingleAccount)
  .patch([authenticateUser,authorizePermissions('admin')], updateAccount)
  .delete([authenticateUser,authorizePermissions('admin')],deleteAccount);

export default router